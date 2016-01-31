FactoryGirl.define do
  factory :user do
    first_name "First"
    last_name "Last"
    sex "Male"
    day 1
    month 1
    year 1994
    country "Ukraine"
    city "Lviv"
    avatar_file_name "medium_Shrek.jpg"
    sequence (:username) { |n| "Username#{n}" }
    sequence (:email) { |n| "user#{n}@example.com" }
    password "qwerty123"
    password_confirmation "qwerty123"
  end

  factory :task do
    sequence (:name) { |n| "Test #{n}" }
    sequence (:description) { |n| "Description #{n}"}
    status 2
    group_id 13
    association :priority_id, factory: :priority
  end

  factory :priority do
    sequence (:name) {|n| "Name#{n}"}
    sequence (:value) {|n| "#{n}"}
    color '#ff0000'
    association :user_id, factory: :user
  end

  factory :group do
    sequence (:name) { |n| 'Group#{n}' }
    sequence (:description) { |n| 'My {n} group' }
  end

  factory :category do
    sequence (:name) { |n| "Category #{n}" }
  end
end
