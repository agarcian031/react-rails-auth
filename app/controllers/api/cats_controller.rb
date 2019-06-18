class Api::CatsController < ApplicationController
  before_action :authenticate_user! 

  def index
    # grabs all ids from the current users liked cats
    render json: User.random_cat(current_user.liked_cats)
  end

  def update
    # shovel the ids of the liked cats into the cats array. 
    current_user.liked_cats << params[:id].to_i 
    current_user.save
  end
end
