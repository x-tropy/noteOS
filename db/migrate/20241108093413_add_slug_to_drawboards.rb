class AddSlugToDrawboards < ActiveRecord::Migration[7.2]
  def change
    add_column :drawboards, :slug, :string
  end
end
