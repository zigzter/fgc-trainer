class CreateRoutineSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :routine_sessions, id: false do |t|
      t.string :id, primary_key: true
      t.references :routine, null: false, foreign_key: true, type: :string
      t.string :user_id, null: false
      t.datetime :started_at
      t.datetime :completed_at
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
