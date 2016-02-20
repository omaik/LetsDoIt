class User < ActiveRecord::Base
  attr_accessor :login

  has_and_belongs_to_many :tasks
  has_many :priorities
  has_and_belongs_to_many :groups
  has_and_belongs_to_many :categories
  has_many :friendships, foreign_key: :user_id
  has_many :friends, ->{ Friendship.accepted }, through: :friendships
  has_many :pending_friendships, ->{ Friendship.pending }, class_name: 'Friendship', foreign_key: :user_id
  has_many :pending_friends, through: :pending_friendships, source: :friend
  has_many :requested_friendships, ->{ Friendship.requested }, class_name: 'Friendship', foreign_key: :user_id
  has_many :requested_friends, through: :requested_friendships, source: :friend

  enum role: [:user, :admin]
  enum language: [:en, :ua]
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "assets/user.png", path: ":rails_root/public/pictures/:attachment/:id/:style_:filename", url: "/pictures/:attachment/:id/:style_:filename"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :async,
         :omniauthable, omniauth_providers: [:facebook], authentication_keys: [:login]

  validates :username, presence: true, length: { in: 6..35 }, uniqueness: true
  validates :first_name, presence: true, format: { with: /\A[\p{L}]+\z/}
  validates :last_name, presence: true, format: { with: /\A[\p{L}]+\z/}
  validates :country, length: { maximum: 20}
  validates :city, length: { maximum: 20}

  # Method which allows us to save data from facebook callback in our DB
  def self.from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.username = auth.info.email
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email
        user.first_name = auth.info.first_name
        user.last_name = auth.info.last_name
        user.social_avatar = auth.info.image
        user.password = Devise.friendly_token[0,20]
      end
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(['lower(username) = :value OR lower(email) = :value', { value: login.downcase }]).first
    else
      where(conditions.to_hash).first
    end
  end

  def stat
    due_date, finished = slice_date_stat(*collect_date_stat)
    { category: categories_stat, due_date: due_date, finished: finished,
      priority: priorities_stat }
  end

  private

  def collect_date_stat
    dates = ((Date.today - 31.days)..(Date.today + 30.days)).to_a
    values = Array.new(dates.length, 0)
    self.tasks.each do |task|
      values[dates.index(task.due_date.to_date)] += 1 if task.due_date
    end
    [dates, values]
  end

  def slice_date_stat(dates, values)
    current_index = dates.index(Date.today)
    dates.map! { |x| x.strftime("%d-%m") }
    due_date_dates = dates.slice!(current_index..-1)
    due_date_values = values.slice!(current_index..-1)
    [[due_date_dates, due_date_values], [dates, values]]
  end

  def categories_stat
    statistic = { value:{ all: [], uncompleted: [], completed: [] }, label: []}
    self.categories.each do |category|
      statistic[:value][:all] << category.tasks.length
      statistic[:value][:uncompleted] << category.tasks
                                      .where('due_date>=?', Date.today)
                                      .length
      statistic[:label] << category.name
    end
    slice_completed(statistic)
  end

  def priorities_stat
    statistic = { value: { all: [], uncompleted: [], completed: [] },
                  color:[],
                  label:[] }
    Priority.for_user(self.id).each do |priority|
      statistic[:value][:all] << priority.tasks.length
      statistic[:value][:uncompleted] << priority.tasks
                                                 .where('due_date>=?', Date.today)
                                                 .length
      statistic[:color] << priority.color
      statistic[:label] << priority.name
    end
    slice_completed(statistic)
  end

  def slice_completed(statistic)
    statistic[:value][:completed]  = statistic[:value][:all]
                                       .zip(statistic[:value][:uncompleted])
                                       .map { |x, y| x - y }
    statistic
  end

  def send_pass
    @generated_password = Devise.friendly_token.first(8)
    ForgetMailer.reset_password_instructions(@generated_password, self).deliver_now
    reset_password(@generated_password, @generated_password)
  end
end
