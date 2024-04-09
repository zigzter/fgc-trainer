class CreateRoutines < ActiveRecord::Migration[7.1]
  def change
    create_table :routines do |t|
      t.string :game
      t.string :title
      t.text :notes
      t.jsonb :combos

      t.timestamps
    end
  end
end
