FactoryGirl.define do
  factory :user do
    first_name "First"
    last_name "Last"
    sequence (:username) { |n| "User#{n}" }
    sequence (:email) { |n| "user#{n}@example.com" }
    password "qwerty123"
    password_confirmation "qwerty123"
  end

  factory :task do
    sequence (:name) { |n| "Test #{n}" }
    sequence (:description) { |n| "Description #{n}"}
    status 2
    priority 1
    group_id 13
    association :user_id, factory: :user
  end
end
