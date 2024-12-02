class SketchesController < ApplicationController
  layout "note"
  before_action :set_sketch, only: [:show, :edit, :update]

  def index
    @sketches = Sketch.all
  end

  def show
  end

  def new
    @sketch = Sketch.new
  end

  def create
    logger.debug "Current user ID: #{current_user.id}"
    @sketch = current_user.sketches.build(sketch_params)
    logger.debug "----------\nCreate sketch: #{@sketch.author_id}"

    if @sketch.save
      redirect_to @sketch, notice: 'Sketch was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    logger.debug "Received params: #{params.inspect}"

    if @sketch.update(sketch_params)
      render json: { status: 'success', message: 'Sketch updated successfully' }
    else
      render json: { status: 'error', errors: @sketch.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_sketch
    @sketch = Sketch.friendly.find(params[:id])
  end

  def sketch_params
    params.require(:sketch).permit(:title, :content)
  end
end
