require 'open-uri'

class AttachmentsController < ApplicationController
  before_action :set_attachment, only: %i[ show edit update destroy ]
  include ActiveStorage::SetCurrent

  # GET /attachments or /attachments.json
  def index
    @attachments = Attachment.all
  end

  # GET /attachments/1 or /attachments/1.json
  def show
  end

  # GET /attachments/new
  def new
    @attachment = Attachment.new
  end

  # GET /attachments/1/edit
  def edit
  end

  # POST /attachments or /attachments.json
  def create
    @attachment = Attachment.new(attachment_params)

    respond_to do |format|
      if @attachment.save
        format.html { redirect_to @attachment, notice: "Attachment was successfully created." }
        format.json { render json: { message: "Attachment created", attachment: @attachment, url: url_for(@attachment.contents) }, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /attachments/1 or /attachments/1.json
  def update
    respond_to do |format|
      if @attachment.update(attachment_params)
        format.html { redirect_to @attachment, notice: "Attachment was successfully updated." }
        format.json { render :show, status: :ok, location: @attachment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /attachments/1 or /attachments/1.json
  def destroy
    @attachment.destroy!

    respond_to do |format|
      format.html { redirect_to attachments_path, status: :see_other, notice: "Attachment was successfully destroyed." }
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

      # Create a new Attachment
      @attachment = Attachment.new(name: filename) # or set a meaningful name

      # Attach the image to the attachment
      @attachment.contents.attach(io: StringIO.new(contents), filename: filename, content_type: file.content_type)

      if @attachment.save
        logger.info "Attachment saved successfully: #{@attachment.id}"
        image_url = url_for(@attachment.contents)
        render json: { status: 'success', attachment: @attachment, image_url: image_url }, status: :ok
      else
        logger.error "Failed to save attachment: #{@attachment.errors.full_messages.join(', ')}"
        render json: { error: 'Failed to save attachment' }, status: :unprocessable_entity
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
  def set_attachment
    @attachment = Attachment.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def attachment_params
    params.require(:attachment).permit(:name, :contents)
  end
end
