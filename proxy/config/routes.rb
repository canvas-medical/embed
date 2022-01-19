Rails.application.routes.draw do

  get '/Auth', to: 'auth#authorize'
end
