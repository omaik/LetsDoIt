# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160111134227) do

  create_table "categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "categories_users", id: false, force: :cascade do |t|
    t.integer "user_id",     limit: 4
    t.integer "category_id", limit: 4
  end

  add_index "categories_users", ["category_id"], name: "index_categories_users_on_category_id", using: :btree
  add_index "categories_users", ["user_id"], name: "index_categories_users_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.integer  "user_id",     limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "priorities", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.string   "name",       limit: 255
    t.integer  "value",      limit: 4
    t.string   "color",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "priorities", ["user_id"], name: "index_priorities_on_user_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "priority_id", limit: 4
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.datetime "due_date"
    t.integer  "status",      limit: 4
    t.integer  "category_id", limit: 4
    t.integer  "group_id",    limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "tasks", ["priority_id"], name: "index_tasks_on_priority_id", using: :btree

  create_table "tasks_users", id: false, force: :cascade do |t|
    t.integer "user_id", limit: 4
    t.integer "task_id", limit: 4
  end

  add_index "tasks_users", ["task_id"], name: "index_tasks_users_on_task_id", using: :btree
  add_index "tasks_users", ["user_id"], name: "index_tasks_users_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "username",               limit: 255
    t.string   "first_name",             limit: 60
    t.string   "last_name",              limit: 60
    t.string   "provider",               limit: 20
    t.string   "uid",                    limit: 60
    t.string   "social_avatar",          limit: 255
    t.integer  "role",                   limit: 4,   default: 0
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
