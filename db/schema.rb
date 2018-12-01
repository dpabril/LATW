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

ActiveRecord::Schema.define(version: 2018_12_01_124433) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin", primary_key: "username", id: :string, limit: 20, force: :cascade do |t|
    t.string "password", limit: 60
    t.string "name", limit: 100, null: false
  end

  create_table "country", primary_key: "isoid", id: :string, limit: 2, force: :cascade do |t|
    t.string "name", limit: 75, null: false
    t.string "offiname", limit: 75, null: false
    t.integer "population", null: false
  end

  create_table "dialect", primary_key: ["isoid", "name"], force: :cascade do |t|
    t.string "isoid", limit: 3, null: false
    t.string "name", limit: 50, null: false
  end

  create_table "isspokenin", primary_key: ["langid", "countryid"], force: :cascade do |t|
    t.string "langid", limit: 3, null: false
    t.string "countryid", limit: 2, null: false
    t.boolean "isnational"
  end

  create_table "language", primary_key: "isoid", id: :string, limit: 3, force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.integer "population"
  end

  create_table "languagebelongsto", primary_key: "langid", id: :string, limit: 3, force: :cascade do |t|
    t.string "lfamid", limit: 50, null: false
  end

  create_table "languagefamily", primary_key: "name", id: :string, limit: 50, force: :cascade do |t|
    t.integer "subgroupcount", null: false
    t.string "info", limit: 3000
  end

  create_table "languageusesscript", primary_key: ["langid", "scriptid"], force: :cascade do |t|
    t.string "langid", limit: 3, null: false
    t.string "scriptid", limit: 4, null: false
  end

  create_table "script", primary_key: "isoid", id: :string, limit: 4, force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "direction", limit: 50, null: false
    t.boolean "hascase", null: false
  end

  add_foreign_key "dialect", "language", column: "isoid", primary_key: "isoid", name: "dialect_isoid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "isspokenin", "country", column: "countryid", primary_key: "isoid", name: "isspokenin_countryid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "isspokenin", "language", column: "langid", primary_key: "isoid", name: "isspokenin_langid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "languagebelongsto", "language", column: "langid", primary_key: "isoid", name: "languagebelongsto_langid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "languagebelongsto", "languagefamily", column: "lfamid", primary_key: "name", name: "languagebelongsto_lfamid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "languageusesscript", "language", column: "langid", primary_key: "isoid", name: "languageusesscript_langid_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "languageusesscript", "script", column: "scriptid", primary_key: "isoid", name: "languageusesscript_scriptid_fkey", on_update: :cascade, on_delete: :cascade
end
