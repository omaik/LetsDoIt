class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :async

         validates :username, presence: true,
                 length: { maximum: 20},
                 uniqueness: true

 end
