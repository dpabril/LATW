Rails.application.routes.draw do
  # root to: 'site#index'
  # Routes for Database manipulation
  scope module: :data do
    scope '/create', controller: :create do
      post '/language', action: :language
      post '/dialect', action: :dialect
      post '/family', action: :family
      post '/script', action: :script
      post '/country', action: :country
      post '/belongsto', action: :belongsto
      post '/isanationallanguageof', action: :isanationallanguageof
      post '/isspokenin', action: :isspokenin
      post '/uses', action: :uses
    end
    scope '/update', controller: :update do
      post '/language', action: :language
      post '/family', action: :family
      post '/script', action: :script
      post '/country', action: :country
    end
    scope '/delete', controller: :delete do
      post '/language', action: :language
      post '/dialect', action: :dialect
      post '/family', action: :family
      post '/script', action: :script
      post '/country', action: :country
      post '/belongsto', action: :belongsto
      post '/isanationallanguageof', action: :isanationallanguageof
      post '/isspokenin', action: :isspokenin
      post '/uses', action: :uses
    end
  end

  scope module: :admin do
    post '/signin', to: 'admin#signin'
    get '/signout', to: 'admin#signout'
  end
  # Routes for site navigation
  scope module: :sitenav do
    # Routes for general site pages (Home, About, FAQ)
    get '/', to: 'site#home'
    get '/search', to: 'site#search'

    # Routes for Languages
    scope '/languages', controller: :languages do
        root action: :index
        get '/:id', action: :one
    end

    # Routes for Language Families
    scope '/families', controller: :language_families do
        root action: :index
        get '/:name', action: :one
    end

    # Routes for Countries
    scope '/countries', controller: :countries do
        root action: :index
        get '/:id', action: :one
    end

    # Routes for Writing Systems
    scope '/scripts', controller: :scripts do
        root action: :index
        get '/:id', action: :one
    end
  end
end