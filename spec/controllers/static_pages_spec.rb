require 'rails_helper'

RSpec.describe StaticPagesController do
  describe 'GET #index' do
    subject { get :index }
    it 'renders the index template' do
    	@x = [{blabla: 'bla'}, {blabla:'blabla'}].to_json
      expect(subject.body).to eq(@x)
    end
  end
end
