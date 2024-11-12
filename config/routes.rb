Rails.application.routes.draw do
  resources :attachments do
    collection do
      post :download_image
      post :upload_clipboard_image
    end
  end

  resources :sketches

  resources :articles do
    collection do
      post :set_mode # Route to set the display/edit mode
    end
  end

  devise_for :users
  root "home#index", as: :homepage

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
