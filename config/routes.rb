Rails.application.routes.draw do

  root 'static_pages#index'
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks', confirmations: 'users/confirmations', passwords: 'users/passwords' }
  get '/edit' => 'tasks#index'
  resources :tasks do
    member do
      post 'share'
    end
    collection do
      get 'stat'
    end
  end
  resources :priorities
  resources :groups do
    member do
      post 'add_friend_to_group'
      get 'members'
      delete 'delete_friend_from_group'
    end
  end
  resources :categories
  resources :users do
    collection do
      post 'validate_user'
    end
  end
  resources :translations, only: :show
  resources :friendships do
    member do
      post 'accept'
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
