class CategoriesController < ApplicationController

	respond_to :json

  def index
    respond_with current_user.categories
  end

  def show
    respond_with current_user.categories.find(params[:id])
  end

  def create
    respond_with current_user.categories.create(category_params)
  end

  def destroy
    respond_with current_user.categories.find_by(id: params[:id]).destroy
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

end
