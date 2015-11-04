require'sinatra'
require 'json'

USERS = []

get '/' do
  erb :index
end

get '/users' do
  USERS.to_json
end

post '/users' do
  user = {
    id: USERS.length,
    name: params[:name]
  }
  USERS << user
  halt 200, {'Content-Type' => 'application/json'}, user.to_json
end

delete '/users/:name' do |name|
  USERS.delete_if {|user| user[:name] == name}
  halt 204
end
