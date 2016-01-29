class FriendshipMailer < ActionMailer::Base
  default from: ENV['GMAIL_USERNAME']

  def friend_requested(user_friendship_id)
    user_friendship = Friendship.find(user_friendship_id)
    @user = user_friendship.user
    @friend = user_friendship.friend
    I18n.locale = @friend.language
    
    mail to: @friend.email, subject: I18n.t('wants_to_be_your_friend', user: "#{@user.first_name} #{@user.last_name}")
  end

  def friend_request_accepted(user_friendship_id)
    user_friendship = Friendship.find(user_friendship_id)
    @user = user_friendship.user
    @friend = user_friendship.friend
    I18n.locale = @friend.language
    
    mail to: @friend.email, subject: I18n.t('accepted_your_request', user: "#{@user.first_name} #{@user.last_name}")
  end
end

