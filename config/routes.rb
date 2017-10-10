Rails.application.routes.draw do
  get 'method_finder/index'
  root 'method_finder#index'

  namespace :api do
    namespace :v0 do
      resources :method_examples, only: [:index]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
