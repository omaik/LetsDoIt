class TranslationsController < ApplicationController
  respond_to :json

  def show
    render file: "config/locales/#{ params[:id] === 'ua' ? 'ua' : 'en' }.json"
  end

end
