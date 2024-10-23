class CreateComboAttempts < ActiveRecord::Migration[7.1]
  def change
    create_table :combo_attempts do |t|
      t.string :id, primary_key: true
      t.references :routine_session, null: false, foreign_key: true, type: string
      t.references :combo, null: false, foreign_key: true, type: :string
      t.integer :reps_done
      t.integer :reps_correct
      t.text :feedback

      t.timestamps
    end
  end
end
