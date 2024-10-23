# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_10_23_210214) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "combo_attempts", force: :cascade do |t|
    t.bigint "routine_session_id", null: false
    t.string "combo_id", null: false
    t.integer "reps_done"
    t.integer "reps_correct"
    t.text "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["combo_id"], name: "index_combo_attempts_on_combo_id"
    t.index ["routine_session_id"], name: "index_combo_attempts_on_routine_session_id"
  end

  create_table "combos", id: :string, force: :cascade do |t|
    t.string "name"
    t.text "inputs", default: [], array: true
    t.text "notes"
    t.integer "reps"
    t.integer "position", null: false
    t.string "routine_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["routine_id", "position"], name: "index_combos_on_routine_id_and_position", unique: true
    t.index ["routine_id"], name: "index_combos_on_routine_id"
  end

  create_table "routine_sessions", force: :cascade do |t|
    t.string "routine_id", null: false
    t.string "user_id", null: false
    t.datetime "started_at"
    t.datetime "completed_at"
    t.boolean "completed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["routine_id"], name: "index_routine_sessions_on_routine_id"
  end

  create_table "routines", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "game"
    t.string "title"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "combo_attempts", "combos"
  add_foreign_key "combo_attempts", "routine_sessions"
  add_foreign_key "combos", "routines"
  add_foreign_key "routine_sessions", "routines"
end
