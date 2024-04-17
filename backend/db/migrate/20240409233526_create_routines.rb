class CreateRoutines < ActiveRecord::Migration[7.1]
  def change
    create_table :routines do |t|
      t.string :user_id, null: false
      t.string :game
      t.string :title
      t.text :notes
      t.jsonb :combos, default: '[]'

      t.timestamps
    end
  end
end
