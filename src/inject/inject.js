var generateDouban = function($position, isbn, url, msg) {
  $position.before('<div class="gray_ad" id="hustlib"></div>');
  $('#hustlib').append('<h2>华科图书馆有没有?</h2><div class="bs" id="isex"></div>');
  if (isbn) {
    if (!msg || msg.indexOf('未找到符合查询条件的馆藏') !== -1) {
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
  } else {
      $('#isex').html('竟然没有！');
  }
}

var generateAmazon = function($position, isbn, url, msg) {
  $position.before('<div class="a-section a-spacing-medium">\
    <div class="a-box"><div class="a-box-inner a-padding-small" id="hustlib"></div></div></div>');
  $('#hustlib').append('<h5>华科图书馆有没有?</h5><div class="a-color-secondary" id="isex"></div>');
  if (isbn) {
    if (!msg || msg.indexOf('未找到符合查询条件的馆藏') !== -1) {
      $('#isex').html('我科快去买书啦~ 竟然没有!');
    } else {
      $('#isex').html("当然有! (●'◡'●)ﾉ♥");
      $('#isex').after('<br><h5>在哪里在哪里?</h5>');
      $(msg).find(".bibOrderEntry").appendTo('#hustlib');
      $(msg).find('.bibItems').appendTo('#hustlib');
      $('#hustlib').append('<br><h5>再具体点?</h5><p><div class="bs" id="mdt"><a href="' + url + '" target="_blank">戳这里~</a></div>');
      for (var i = 1; i <= $('#hustlib tr').length - 1; i++) {
        var booknum = $('#hustlib tr').eq(i).find('td').eq(1).text();
        $('#hustlib tr').eq(i).find('td').eq(1).remove();
        $('#hustlib tr').eq(i).find('td').eq(0).after('<td width="43%">'+ booknum + '</td>');
      }
    }
  } else {
      $('#isex').html('竟然没有！');
  }
}

var generateInfo = function(site, $position, isbn) {
  if (isbn) {
    var url = 'https://ftp.lib.hust.edu.cn/search~S0*chx/?searchtype=i&searcharg=+' + isbn;
    $.ajax({
      url : url,
      success : function (msg) {
        switch (site) {
          case 'douban':
            generateDouban($position, isbn, url, msg);
            break;
          case 'amazon':
            generateAmazon($position, isbn, url, msg);
            break;
        }
      }
    });
  } else {
    switch (site) {
      case 'douban':
        generateDouban($position, isbn);
        break;
      case 'amazon':
        generateAmazon($position, isbn);
        break;
    }
  }
}

if(window.location.host === 'book.douban.com' && $('#buyinfo').length){
  var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1];
  generateInfo('douban', $('#buyinfo'), isbn);
} else if (window.location.host === 'www.amazon.cn' && $('#buybox').length) {
  var content = $('#detail_bullets_id .content').text();
  if (content.indexOf('图书') !== -1) {
    var isbnRe = /ISBN:\s+(\d+)/g;
    var isbn = isbnRe.exec(content);
    generateInfo('amazon', $('#buybox'), isbn[1]);

  }
}
