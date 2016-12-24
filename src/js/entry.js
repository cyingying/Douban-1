require('../less/douban.less');
var bookname;
var page = 0;
$('.btn input').on('click',function(){
    console.log('----');
    page = 0;
    $('.sah input')[0].innerHTML = '';
    search();
    return false;
})

function search(){
 console.log('........');
 if($('.sah input')[0].value){
   bookname = $('.sah input')[0].value;
   // console.log(bookname);
   $.ajax({
   	  url:'https://api.douban.com/v2/book/search',
      dataType:'jsonp',
      type:'GET',
      data:{q:bookname,start:page,count:10},
      success:callback,
      error:function(){
        console.log('error');
      }
    })  
 }
}

function callback(data){
  $('.book').empty();
  console.log(data);
  if(data.total === 0){
  	alert('sorry,this book is no');
  }else{
   for(var i = 0;i < data.count;i++){
     $('.book')[0].innerHTML += '<div class="book-list"><img src="' + data.books[i].image + '" class="book-img" alt="" height="103px" width="80px"><div class="book-right"><a class="book-title" href="' + data.books[i].alt + '" >' + data.books[i].title + '</a><div class="book-intro">' + data.books[i].author[0] +"/" + data.books[i].translator + "/" + data.books[i].pubdate + "/" + data.books[i].price + '</div><span class="book-star book-star'+ parseInt(data.books[i].rating.average) +'"></span><span class="average">' + data.books[i].rating.average + '</span><span class="book-pingjia">(' + data.books[i].id + '评价)</span></div></div>';
   }
   if(data.count === 0){
     alert('只有这些了');
   }
   $(".book")[0].innerHTML +='<div class="bookload">加载更多...</div>';
     $('.bookload').on('click',function(){
	  $('.bookload').remove();
	  console.log('cgvhjbk');
	  page+=10;
	  search();
   })
  }
 }



$('.head .head2').mouseenter(function(){
    $('.head .head2 .code').css('display','block');
}).mouseleave(function(){
    $('.head .head2 .code').css('display','none');
})