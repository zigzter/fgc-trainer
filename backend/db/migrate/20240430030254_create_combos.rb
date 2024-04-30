class CreateCombos < ActiveRecord::Migration[7.1]
  def change
    create_table :combos, id: false do |t|
      t.string :id, primary_key: true
      t.string :name
      t.text :inputs, array: true, default: []
      t.text :notes

      t.string :routine_id, null: false

      t.timestamps
    end

    add_foreign_key :combos, :routines, column: :routine_id
    add_index :combos, :routine_id
  end
end
