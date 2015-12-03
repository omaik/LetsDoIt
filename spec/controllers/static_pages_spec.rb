require 'rails_helper'

RSpec.describe StaticPagesController do
  describe 'GET #index' do
    subject { get :index }
    it 'renders the index template' do
    	@x = [{blabla: 'bla'}, {blabla:'blabla'}].to_json
      expect(subject.body).to eq(@x)

RSpec.describe StaticPagesController do
  describe "GET #index" do
    subject { get :index }

    it "renders the index template" do
      expect(subject).to render_template(:index)
      expect(subject).to render_template("index")
      expect(subject).to render_template("static_pages/index")
    end
  end
end
