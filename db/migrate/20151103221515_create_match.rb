class CreateMatch < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.references :user
    end
  end
end
