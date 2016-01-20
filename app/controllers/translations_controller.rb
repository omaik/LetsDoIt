class TranslationsController < ApplicationController
  skip_before_filter :authenticate
  respond_to :json

  def show
    render file: "config/locales/#{ params[:id] === 'ua' ? 'ua' : 'en' }.json"
  end

end
