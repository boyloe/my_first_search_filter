class DogsController < ApplicationController

  def index
    if params[:nameSearch] && !params[:nameSearch].empty?
      @dogs =  Dog.where('name LIKE ?', "%#{params[:nameSearch]}%")
    elsif params[:ageSearch] && !params[:ageSearch].empty?
      @dogs = Dog.where('age > ?',  params[:ageSearch])
    else  
    @dogs = Dog.all    
    end
    render json: @dogs
  end


  def create
    @dog = Dog.new(name: params[:name], age: params[:age])

    if @dog.valid?
      @dog.save
      render json: @dog
    else
      render json:{ message: @dog.errors.full_messages}
    end
  
  end
end
