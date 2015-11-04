require'sinatra'
require 'json'

USERS = []

get '/' do
  erb :index
end

get '/users' do
  content_type :json
  USERS.to_json
end

post '/users' do
  user = {
    id: USERS.size,
    name: params[:name]
  }
  USERS << user
  halt 200, {'Content-Type' => 'application/json'}, user.to_json
end
