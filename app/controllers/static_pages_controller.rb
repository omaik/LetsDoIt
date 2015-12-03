class StaticPagesController < ApplicationController
  def index
  	@x = [{blabla: "bla"}, {blabla:"blabla"}]
  	render json: @x
  end
end
