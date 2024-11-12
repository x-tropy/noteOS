class AddSlugToDrawboards < ActiveRecord::Migration[7.2]
  def change
    add_column :sketches, :slug, :string
  end
end
