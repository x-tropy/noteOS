class DrawboardsController < ApplicationController
  before_action :set_drawboard, only: [:show, :edit, :update]

  def index
    @drawboards = Drawboard.all
  end

  def show
  end

  def new
    @drawboard = Drawboard.new
  end

  def create
    logger.debug "Current user ID: #{current_user.id}"
    @drawboard = current_user.drawboards.build(drawboard_params)
    logger.debug "----------\nCreate drawboard: #{@drawboard.author_id}"

    if @drawboard.save
      redirect_to @drawboard, notice: 'Drawboard was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @drawboard.update(drawboard_params)
      render json: { status: 'success', message: 'Drawboard updated successfully' }
    else
      render json: { status: 'error', errors: @drawboard.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_drawboard
    @drawboard = Drawboard.friendly.find(params[:id])
  end

  def drawboard_params
    params.require(:drawboard).permit(:title, :content)
  end
end
