class User < ActiveRecord::Base
  has_and_belongs_to_many :tasks
  has_many :priorities
  has_many :groups
  enum role: [:user, :admin]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :async,
         :omniauthable, omniauth_providers: [:facebook]

  validates :username, presence: true, length: { maximum: 35}, uniqueness: true
  validates :first_name, presence: true, format: { with: /\A[\p{L}]+\z/}
  validates :last_name, presence: true, format: { with: /\A[\p{L}]+\z/}

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

