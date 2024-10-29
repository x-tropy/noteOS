require 'open-uri'

class ItemsController < ApplicationController
  before_action :set_item, only: %i[ show edit update destroy ]
  include ActiveStorage::SetCurrent

  # GET /items or /items.json
  def index
    @items = Item.all
  end

  # GET /items/1 or /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items or /items.json
  def create
    @item = Item.new(item_params)

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: "Item was successfully created." }
        format.json { render json: { message: "Item created", item: @item, url: url_for(@item.contents) }, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1 or /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: "Item was successfully updated." }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1 or /items/1.json
  def destroy
    @item.destroy!

    respond_to do |format|
      format.html { redirect_to items_path, status: :see_other, notice: "Item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  # download image from URL
  def download_image

    url = params[:url]
    logger.info "Received URL: #{url}"

    # Validate URL format
    unless url =~ /\Ahttps?:\/\/.+\z/
      logger.error "Invalid URL format: #{url}"
      render json: { error: 'Invalid URL format' }, status: :unprocessable_entity and return
    end

    begin
      filename = File.basename(url)
      file = URI.open(url) # Fetch the image from the provided URL
      contents = file.read # Read the contents of the image

      # Create a new Item
      @item = Item.new(name: filename) # or set a meaningful name

      # Attach the image to the item
      @item.contents.attach(io: StringIO.new(contents), filename: filename, content_type: file.content_type)

      if @item.save
        logger.info "Item saved successfully: #{@item.id}"
        image_url = url_for(@item.contents)
        render json: { status: 'success', item: @item, image_url: image_url }, status: :ok
      else
        logger.error "Failed to save item: #{@item.errors.full_messages.join(', ')}"
        render json: { error: 'Failed to save item' }, status: :unprocessable_entity
      end
    rescue OpenURI::HTTPError => e
      logger.error "HTTP error occurred: #{e.message}"
      render json: { error: 'Failed to fetch image from URL.' }, status: :unprocessable_entity
    rescue StandardError => e
      logger.error "Error occurred: #{e.message}"
      render json: { error: 'An error occurred while processing your request.' }, status: :internal_server_error
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_item
    @item = Item.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def item_params
    params.require(:item).permit(:name, :contents)
  end
end
