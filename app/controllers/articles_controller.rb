class ArticlesController < ApplicationController
  layout "note"

  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def set_mode
    mode = params[:mode] # Expecting "display" or "edit"
    cookies[:mode] = { value: mode, expires: 1.year.from_now } # Set cookie for 1 year
    slug = params[:article_slug]

    # Check if the article_id is present and valid
    if slug.present?
      if mode == 'edit'
        redirect_to edit_article_path(slug) # Redirect to edit path
      else
        redirect_to article_path(slug) # Redirect to display path
      end
    else
      # Optionally handle cases where the article_slug is not valid
      redirect_to articles_path
    end
  end

  def index
    @articles = current_user.articles.order(updated_at: :desc)
  end

  def show
  end

  def new
    @article = current_user.articles.build
  end

  def create
    @article = current_user.articles.build(article_params)
    logger.debug "--------------\n Aritlce: #{@article.author_id}"
    if @article.save
      redirect_to articles_path, notice: "Article was successfully created."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @article.update(article_params)

      respond_to do |format|
        format.json { render json: { success: true, message: "Article updated successfully" } }
      end
    else
      respond_to do |format|
        format.json { render json: { success: false, errors: @article.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_url, notice: "Article was successfully destroyed."
  end

  private

  def set_article
    @article = Article.friendly.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content)
  end
end
