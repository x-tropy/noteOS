json.extract! item, :id, :name, :contents, :created_at, :updated_at
json.url item_url(item, format: :json)
json.contents url_for(item.contents)
