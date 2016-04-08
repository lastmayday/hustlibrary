if($('#buyinfo').length){
  $('#buyinfo').before('<div class="gray_ad" id="hustlib"></div>');
  $('#hustlib').append('<h2>华科图书馆有没有?</h2><div class="bs" id="isex"></div>');
  if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
    var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1];
    var url = 'https://ftp.lib.hust.edu.cn/search~S0*chx/?searchtype=i&searcharg=+' + isbn;
    $.ajax({
      url : url,
      success : function (msg) {
        if (msg.indexOf('未找到符合查询条件的馆藏') != -1) {
          $('#isex').html('我科快去买书啦~ 竟然没有!');
        } else {
          $('#isex').html("当然有! (●'◡'●)ﾉ♥");
          $('#isex').after('<br><h2>在哪里在哪里?</h2>');
          $(msg).find(".bibOrderEntry").appendTo('#hustlib');
          $(msg).find('.bibItems').appendTo('#hustlib');
          $('#hustlib').append('<br><h2>再具体点?</h2><p><div class="bs" id="mdt"><a href="' + url + '" target="_blank">戳这里~</a></div>');
          for (var i = 1; i <= $('#hustlib tr').length - 1; i++) {
            var booknum = $('#hustlib tr').eq(i).find('td').eq(1).text();
            $('#hustlib tr').eq(i).find('td').eq(1).remove();
            $('#hustlib tr').eq(i).find('td').eq(0).after('<td width="43%">'+ booknum + '</td>');
          }
        }
      }
    });
  } else {
    $('#isex').html('竟然没有！');
  }
}
