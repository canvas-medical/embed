Rails.application.routes.draw do

  get '/Auth', to: 'auth#authorize'
  get '/Schedule', to: 'schedule#index'
end
