class RenameDrawboardToSketch < ActiveRecord::Migration[7.2]
  def change
    rename_table :drawboards, :sketches
  end
end
