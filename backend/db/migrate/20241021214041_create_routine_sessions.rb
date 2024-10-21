class CreateRoutineSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :routine_sessions do |t|
      t.references :routine, null: false, foreign_key: true, type: :string
      t.string :user_id, null: false
      t.datetime :started_at
      t.datetime :completed_at
      t.boolean :completed

      t.timestamps
    end
  end
end
