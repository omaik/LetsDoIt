class User < ActiveRecord::Base

  has_and_belongs_to_many :tasks
  has_many :priorities
  has_many :groups
  has_and_belongs_to_many :categories
  enum role: [:user, :admin]
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "assets/user-7677ff2b4b2db110e515aef66d8cf68a.png", path: ":rails_root/public/pictures/:attachment/:id/:style_:filename", url: "/pictures/:attachment/:id/:style_:filename"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :async,
         :omniauthable, omniauth_providers: [:facebook]

  validates :username, presence: true, length: { maximum: 35}, uniqueness: true
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
end
