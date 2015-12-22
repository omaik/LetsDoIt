FactoryGirl.define do
  factory :user do
    sequence (:username) { |n| "User#{n}" }
    sequence (:email) { |n| "user#{n}@example.com" }
    first_name "User"
    last_name "Example"
    password "qwerty123"
    password_confirmation "qwerty123"
  end

  factory :task do
    name 'Test'
    description 'My first task'
    status 2
    priority 1
    group_id 13
    user_id 543
  end
end
