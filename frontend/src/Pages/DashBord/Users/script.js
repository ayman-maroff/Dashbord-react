/* eslint-disable no-undef */
// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
import $ from 'jquery';

window.$ = $;
$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content body').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
  }).resize();
  $(document).ready(function() {
    $('input.deletable').wrap('<span class="deleteicon"></span>').after($('<span>x</span>').click(function() {
        $(this).prev('input').val('').trigger('change').focus();
    }));
});