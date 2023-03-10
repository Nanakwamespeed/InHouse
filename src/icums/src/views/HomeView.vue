<template>
      <!-- search area -->
      <div class="sch_area">
        <div class="sch_tit">
          <strong class="title">Cargo Tracking</strong>
          <span class="slogan">For Your Safe and Easy Import &amp; Export Transaction</span>
        </div>
        <div class="form_area">
          <div class="sch_set">
            <div class="radio_set">
              <div><input type="radio" id="crnA" name="trackingOption" value="CRN"
                          style="margin:3px;"><label for="crnA"
                                                     style="vertical-align: middle;white-space: nowrap;"
                                                     title="Cargo Reference No">CRN</label></div>
              <div><input type="radio" id="blA" name="trackingOption" value="BL" style="margin:3px;"
                          checked=""><label for="blA" style="vertical-align: middle;white-space: nowrap;"
                                            title="BL No">BL No</label></div>
              <div><input type="radio" id="cnA" name="trackingOption" value="CONTAINER"
                          style="margin:3px;"><label for="cnA"
                                                     style="vertical-align: middle;white-space: nowrap;"
                                                     title="Container/Chassis No">Container/Chassis No</label></div>
              <div><input type="radio" id="boeA" name="trackingOption" value="BOE"
                          style="margin:3px;"><label for="boeA"
                                                     style="vertical-align: middle;white-space: nowrap;" title="BOE No">BOE
                No</label></div>
              <div><input type="radio" id="doA" name="trackingOption" value="DO"
                          style="margin:3px;"><label for="doA"
                                                     style="vertical-align: middle;white-space: nowrap;" title="DO/SR No">DO/SR
                No</label></div>
            </div>
            <div class="key_set">
              <input class="form-control" id="cargNo" type="search" maxlength="4000" placeholder="">
              <button class="btn_search" onclick=""><i
                  class="sch_icon"></i></button>
            </div>
          </div>
        </div>
      </div>
      <!--search area -->
      <div class="grid-container">
        <!-- tab -->
        <div class="tab">
          <div class="tab__icon">
            <ul>
              <li id="tab1" class="btnCon"><input type="radio" checked="" name="tabmenu" id="tabmenu1">
                <label for="tabmenu1" style="border-right: 1px solid #ddd">Tracking</label>
                <div class="tabCon">
                  <ul class="tab-cont1">
                    <li v-for="track in tracking">
                      <a href="#">
                        <p>{{track.icon_name}}</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <!-- //tab -->
        <!-- curreny -->
        <div class="curreny"><!-- Exchange rates -->
          <h2 class="section__title">Exchange Rates</h2>
          <table class="table" id="exchangeTable">
            <caption>Curreny Info</caption>
            <thead>
            <tr>
              <th scope="col" v-for="column in columns" :key="column">
                {{ column }}
              </th>
            </tr>
            </thead>
            <tbody id="text_center">

            <tr v-for="(item, index) in rates" :key="index">
              <td
                  v-for="(column, index) in columns"
                  :key="index"
              >
                <span v-if="column === 'Country'" :class="item['flag']"></span>
                {{ itemValue(item, column) }}
              </td>
            </tr>
            </tbody>
          </table>
          <div class="curreny__more"><a
              href="#">More</a>
          </div>
        </div>
        <!-- //curreny -->
        <!-- code -->
        <div class="code">
          <dl>
            <dt><i>Code</i></dt>
            <dd>
              <p>Code</p>
              <ul>
                <li><a href="#">ICUMS Code</a></li><!-- IIM01S02V03 -->
                <li><a href="#">HS Code</a></li><!-- IIM01S02V01 -->
                <li><a href="#">CPC</a></li><!-- IIM01S02V02 -->
                <li><a href="#">Customs Regime Codes</a></li><!-- IIM01S02V02 -->
              </ul>
            </dd>
          </dl>
        </div>
        <!-- //code -->
        <!-- info -->
        <div class="info">
          <dl>
            <dt><i>Information</i></dt>
            <dd>
              <p>Information</p>
              <ul>
                <li><a href="#">Duty Calculator</a></li>
                <li><a href="#">Used Vehicle Duty Calculator</a></li>
                <li><a href="#">Certificate of Origin</a></li>
                <li><a href="#">Certificate of GFZA Form9 Application</a></li>
                <li><a href="#">Attached Docs by HS</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <!-- //info -->
        <!-- news -->
        <div class="news"><!-- Notice -->
          <h2 class="skip">board</h2>
          <ul class="news__list clearfix">
            <li class="news__nav-item n1 active"><a href="#">Notice</a>
              <div class="news__content" style="">
                <ul>

                  <li><a href="javascript:goDetail('11','IIM01S01V01')">Validation For Shipper’s
                    Own Container (SOC) On BOE</a> <span>13/03/2022</span></li>

                  <li><a href="javascript:goDetail('10','IIM01S01V01')">notice test</a>
                    <span>28/12/2020</span></li>

                  <li><a href="javascript:goDetail('9','IIM01S01V01')">Information regarding
                    Africa Continental Free Trade Area (AfCFTA)</a> <span>28/12/2020</span>
                  </li>

                </ul>
              </div>
              <div class="news__more" style="">
                <a href="/co/notice/selectNoticeList.do?MENU_ID=IIM01S01V01">More</a>
              </div>
            </li>
            <li class="news__nav-item n2"><a href="#">Q&amp;A</a>
              <div class="news__content" style="display: none;">
                <ul>

                  <li><a href="javascript:goDetail('11','IIM01S01V03')">GREAT</a>
                    <span>21/11/2019</span></li>

                  <li><a href="javascript:goDetail('7','IIM01S01V03')">hi</a>
                    <span>05/04/2019</span></li>

                  <li><a href="javascript:goDetail('6','IIM01S01V03')">Where can I find my ID and
                    password?</a> <span>28/03/2019</span></li>

                </ul>
              </div>
              <div class="news__more" style="display: none;">
                <a href="/co/notice/selectQnaList.do?MENU_ID=IIM01S01V03">More</a>
              </div>
            </li>
            <li class="news__nav-item n3"><a href="#">FAQ</a>
              <div class="news__content" style="display: none;">
                <ul>

                  <li><a href="javascript:goDetail('9','IIM01S01V02')">WHEN WILL THE NEW
                    EXPLANATORY NOTES BE AVAILABLE FOR PURCHASE?</a> <span>28/03/2019</span>
                  </li>

                  <li><a href="javascript:goDetail('8','IIM01S01V02')">WHAT ARE THE “EXPLANATORY
                    NOTES?</a> <span>28/03/2019</span></li>

                  <li><a href="javascript:goDetail('7','IIM01S01V02')">HOW IS THE HS
                    STRUCTURED?</a> <span>28/03/2019</span></li>

                </ul>
              </div>
              <div class="news__more" style="display: none;">
                <a href="/co/notice/selectFaqList.do?MENU_ID=IIM01S01V02">More</a>
              </div>
            </li>
          </ul>
        </div>
        <!-- //news -->
        <!-- graph -->
        <div class="graph">
          <h2 class="section__title">Statistics</h2>
          <select id="statSelect" name="statSelect" class="text_input graph_input">
            <option value="stat1">Monthly import and export declaration volume</option>
            <option value="stat2">Each countries monthly Top 10 import declarations</option>
            <option value="stat3">Top 5 HS codes of top 10 biggest importing countries</option>
            <!-- <option value="stat4">Monthly Collected Amount</option> -->
            <option value="stat5">Export Percent in five major interested fields</option>
          </select>
          <div class="basic">
            <div id="statMMYYYY" style="display:none">
              <select id="statMM" name="statMM" class="text_input"
                      style="position:absolute; top:40px; left:10px; z-index:10; width:30px;">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select id="statYY" name="statYY" class="text_input"
                      style="position:absolute; top:40px; left:62px; z-index:10; width:62px;">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <!-- <p class="graph_sample">Statistics graph</p> -->
            <p id="chart-container"></p>
          </div>
        </div>
        <!-- //graph -->
        <!-- popup -->
        <div class="popup"><!-- Popup -->
          <h2 class="section__title">Popup Zone</h2>
          <!-- <div class="popup__more"><a href="/co/notice/selectPopupzoneList.do?MENU_ID=IIM01S01V07">More</a></div> -->
          <div class="popup__control clearfix">
            <button type="button" class="popup__button play">popup play</button>
            <button type="button" class="popup__button pause">popup pause</button>
            <button type="button" class="popup__button prev slick-arrow" style="">previous</button>
            <button type="button" class="popup__button next slick-arrow" style="">next</button>
          </div>
          <div class="popup__list clearfix slick-initialized slick-slider">
            <div class="slick-list">
              <div class="slick-track"
                   style="opacity: 1; width: 2086px; transform: translate3d(-894px, 0px, 0px);">
                <div class="slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">Terms and Conditions</div>
                      <div class="popup__date">01/12/2021 09:20:31</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('2','IIM01S01V07');" tabindex="-1">
                          This website is created with the purpose of providing
                          information to the public on the laws, <br>regulations and
                          procedures which guides importation of goods into Ghana


                        </a>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="slick-slide" data-slick-index="0" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">Validation for Shipper’s Own Container (SOC)
                        on BOE</div>
                      <div class="popup__date">21/03/2022 05:36:15</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('5','IIM01S01V07');" tabindex="-1">
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;"><span
                                style="font-weight: 600;">Validation for
                                                                        Shipper’s Own Container (SOC) on
                                                                        BOE</span></span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">To ensure that
                                                                    Declarants declare&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;as
                                                                    part of items on BOE for Assessment, the system
                                                                    would check and validate for&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator,&nbsp;<span
                                  style="font-weight: 600;">Y</span>&nbsp;on the
                                                                    Manifest.</span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"><br></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;"><br></span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">For DPM, if the
                                                                    Manifest has any containers with the&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator
                                                                    as&nbsp;<span style="font-weight: 600;">Y</span>,
                                                                    then the BOE items list must have an item(s) with HS
                                                                    Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;same
                                                                    in number as the number of containers
                                                                    with&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator
                                                                    Y. Example: If there are 2&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator,&nbsp;<span
                                  style="font-weight: 600;">Y</span>&nbsp;on the
                                                                    Manifest, then the sum of item quantities with HS
                                                                    Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;must
                                                                    be equal to 2 else BOE submission will fail.</span>
                            </font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"><br></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">For PMD, during
                                                                    Manifest Matching, the same validation will apply
                                                                    and will fail if the appropriate number
                                                                    of&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;with
                                                                    HS Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;is/are
                                                                    not listed as part of the BOE items. Declarant would
                                                                    either have to create a Post Entry to add
                                                                    the&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;with
                                                                    the correct count or amend Manifest details if the
                                                                    error is from the Manifest.</span></font>
                          </p>
                          <div style="text-align: justify;"><br></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="slick-slide" data-slick-index="1" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">CALL CENTRE</div>
                      <div class="popup__date">01/12/2021 09:20:23</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('3','IIM01S01V07');" tabindex="-1">
                          <b><span style="font-size: 18px;">030-275-0140</span></b>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="slick-slide slick-current slick-active" data-slick-index="2"
                     aria-hidden="false" style="width: 298px;">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">Terms and Conditions</div>
                      <div class="popup__date">01/12/2021 09:20:31</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('2','IIM01S01V07');" tabindex="0">
                          This website is created with the purpose of providing
                          information to the public on the laws, <br>regulations and
                          procedures which guides importation of goods into Ghana
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="slick-slide slick-cloned" data-slick-index="3" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">Validation for Shipper’s Own Container (SOC)
                        on BOE</div>
                      <div class="popup__date">21/03/2022 05:36:15</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('5','IIM01S01V07');" tabindex="-1">
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;"><span
                                style="font-weight: 600;">Validation for
                                                                        Shipper’s Own Container (SOC) on
                                                                        BOE</span></span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">To ensure that
                                                                    Declarants declare&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;as
                                                                    part of items on BOE for Assessment, the system
                                                                    would check and validate for&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator,&nbsp;<span
                                  style="font-weight: 600;">Y</span>&nbsp;on the
                                                                    Manifest.</span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"><br></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;"><br></span></font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">For DPM, if the
                                                                    Manifest has any containers with the&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator
                                                                    as&nbsp;<span style="font-weight: 600;">Y</span>,
                                                                    then the BOE items list must have an item(s) with HS
                                                                    Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;same
                                                                    in number as the number of containers
                                                                    with&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator
                                                                    Y. Example: If there are 2&nbsp;<span
                                  style="font-weight: 600;">SOC</span>&nbsp;indicator,&nbsp;<span
                                  style="font-weight: 600;">Y</span>&nbsp;on the
                                                                    Manifest, then the sum of item quantities with HS
                                                                    Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;must
                                                                    be equal to 2 else BOE submission will fail.</span>
                            </font>
                          </p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;"><br></p>
                          <p class="MsoNormal"
                             style="margin-right: -0.5pt; text-align: justify;">
                            <font face="Tahoma, sans-serif"><span
                                style="font-size: 18.6667px;">For PMD, during
                                                                    Manifest Matching, the same validation will apply
                                                                    and will fail if the appropriate number
                                                                    of&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;with
                                                                    HS Code&nbsp;<span
                                  style="font-weight: 600;">8609000000</span>&nbsp;is/are
                                                                    not listed as part of the BOE items. Declarant would
                                                                    either have to create a Post Entry to add
                                                                    the&nbsp;<span
                                  style="font-weight: 600;">SOCs</span>&nbsp;with
                                                                    the correct count or amend Manifest details if the
                                                                    error is from the Manifest.</span></font>
                          </p>
                          <div style="text-align: justify;"><br></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="slick-slide slick-cloned" data-slick-index="4" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">CALL CENTRE</div>
                      <div class="popup__date">01/12/2021 09:20:23</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('3','IIM01S01V07');" tabindex="-1">
                          <b><span style="font-size: 18px;">030-275-0140</span></b>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="slick-slide slick-cloned" data-slick-index="5" aria-hidden="true"
                     style="width: 298px;" tabindex="-1">
                  <div>
                    <div class="popup__item" style="width: 100%; display: inline-block;">
                      <div class="popup__title">Terms and Conditions</div>
                      <div class="popup__date">01/12/2021 09:20:31</div>
                      <div class="popup__text">
                        <a href="javascript:goDetail('2','IIM01S01V07');" tabindex="-1">
                          This website is created with the purpose of providing
                          information to the public on the laws, <br>regulations and
                          procedures which guides importation of goods into Ghana
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- //popup -->
        <!-- slider -->
        <div class="slider">
          <ul id="flexiselBanner">
            <!-- <li><a href="https://play.google.com/store/apps/details?id=com.icumsextapp" target="blank"><img src="/images/main/googleplay.png" alt="get it on google play"></a></li> -->
            <li><a href="https://egovonline.gegov.gov.gh/RGDPortalWeb/portal/RGDHome/eghana.portal"
                   target="_blank" class="rgd">Registrar General’s Department</a></li>
            <li><a href="https://gra.gov.gh/" target="_blank" class="gra">Ghana Revenue Authority</a>
            </li>
            <li><a href="https://www.bog.gov.gh" target="_blank" class="bog">Bank of Ghana</a></li>
            <li><a href="https://www.mofep.gov.gh" target="_blank" class="mofep">Ministry of Finance</a>
            </li>
            <li><a href="https://www.gsa.gov.gh" target="_blank" class="gsa">Ghana Standards
              Authority</a></li>
          </ul>
        </div>
        <!-- //slider -->
        <!-- banner -->
        <div class="banner">
          <ul class="support">
            <li class="support_tit">Support Browser</li>
            <li>
              <a href="https://www.google.com/intl/en/chrome/" target="_blank"
                 class="chrome">Chrome</a>
              <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank"
                 class="firefox">Firefox</a>
              <a href="https://www.microsoft.com/en-us/edge" target="_blank" class="edge">Microsoft
                Edge</a>
            </li>
            <li class="app_google">
              <a href="https://play.google.com/store/apps/details?id=com.icumsextapp"
                 target="blank"><img src="/images/main/googleplay.png"
                                     alt="get it on google play"></a>
              <a href="https://play.google.com/store/apps/details?id=com.icumsextapp" target="blank"
                 class="app"><img src="/images/main/icums_mini.png" alt="icums mini"></a>
            </li>
          </ul>
        </div>
        <!-- //banner -->
      </div>
    <!-- //main 콘텐츠영역, main contents area -->
    <footer class="footer">
      <div>
        <div class="footer__outro">
                        <span>TEL<a href="callto:0302750140">0302750140</a>/<a
                            href="callto:0596921182">0596921182</a>EMAIL<a
                            href="mailto:info@icums.gov.gh">info@icums.gov.gh</a></span>
          <span>
                            <font color="#F9F9F9">Ver 1.7 20220901</font> COPYRIGHT(C)2020 by CUPIA. All RIGHT RESERVED.
                        </span>
        </div>
      </div>
    </footer>
<!--  <article class="sub-content">-->
<!--    <div id="canvasloader-container" class="wrapper"></div>-->
<!--    <div class="g-tab g-responsive">-->
<!--      <nav class="g-tab__nav">-->
<!--        <ul class="g-tab__nav-group">-->
<!--          <li class="g-tab__nav-item active open"><a href="#" class="g-tab__nav-link"><label>General</label></a></li>-->
<!--          <li class="g-tab__nav-item"><a href="#" class="g-tab__nav-link"><label>BL/AWB</label></a>-->
<!--          </li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Invoice</label></a></li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Documents</label></a></li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Item</label></a>-->
<!--          </li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Summary</label></a></li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Tax</label></a>-->
<!--          </li>-->
<!--          <li class="g-tab__nav-item"><a href="#');" class="g-tab__nav-link"><label>Error Notice-->
<!--            Info.</label></a></li>-->
<!--        </ul>-->
<!--      </nav>-->
<!--    </div>-->
<!--    <form id="headerForm" name="headerForm" method="post">-->
<!--      <h3 class="margin_t_20">-->
<!--        <label>Header</label>-->
<!--      </h3>-->
<!--      <div class="c-table row">-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Job No.</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <span class="jobNo">2301300025GTNNMEL02</span><input type="hidden" id="jobNo" name="jobNo"-->
<!--                                                               value="2301300025GTNNMEL02">-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Status</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          ER - Draft-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>BoE No.</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <input type="hidden" id="boeNo" name="boeNo" value="">-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>UCR No.</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <input type="text" id="ucrNo" name="ucrNo" title="" class="text_input required upperCase "-->
<!--                 value="KGHCEPSUCR2300000099" maxlength="35">-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Regime</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-6 col-24">-->
<!--            <input type="text" id="regimeCd" name="regimeCd" class="text_input readonly required" value="40"-->
<!--                   readonly="readonly">-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5">-->
<!--            <input type="text" id="regimeCdNm" name="regimeCdNm" class="text_input readonly"-->
<!--                   value="Import into home consumption (Direct Import)" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Customs Office</label><span class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-9 col-24">-->
<!--            <div class="text_input-group">-->
<!--              <input type="text" id="customsOfficeCd" name="customsOfficeCd" size="null" maxlength="4" required="true"-->
<!--                     value="TMA1" class="text_input ui-autocomplete-input"-->
<!--                     onblur="setBlankName('customsOfficeCd', 'customsOfficeCdNm');getCodeName('Code', 'CO001', this.value, 'customsOfficeCd', 'customsOfficeCdNm', '', 'true', '');"-->
<!--                     uppercase="" autocomplete="off">-->
<!--              <span class="text_input__addon"> <button type="button" class="s-button search" data-button="windowOp"-->
<!--                                                       onclick="javascript:goPopup('Code', 'customsOfficeCd','customsOfficeCdNm', '', '', 'CO001', '', '', '', '', '') "><span-->
<!--                  class="skip">Search</span></button></span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5"><input type="text" id="customsOfficeCdNm" name="customsOfficeCdNm"-->
<!--                                                       size="null" value="CEPS TEMA" class="text_input readonly" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>CL. Plan</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-6 col-24">-->
<!--            <input type="text" id="clearancePlanCd" name="clearancePlanCd" class="text_input readonly required"-->
<!--                   value="PMD" readonly="readonly">-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5">-->
<!--            <input type="text" id="clearancePlanCdNm" name="clearancePlanCdNm" class="text_input readonly"-->
<!--                   value="PMD, Pre-Manifest Declaration" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Declaration Form Type</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <select name="declarationFormTypeCd" id="declarationFormTypeCd" class="text_input" required="true" size="1">-->
<!--            <option value="G" selected="selected">G, General</option>-->
<!--            <option value="R">R, Release Prior to BOE</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>User Reference No.</label></div>-->
<!--        <div class="c-table__td col-xl-21 col-17">-->
<!--          <input type="text" id="userReferenceNo" name="userReferenceNo" title=""-->
<!--                 class="text_input text_input upperCase" value="" maxlength="30">-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Doc Date</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="text_input-group text_input-group&#45;&#45;calendar">-->
<!--            <span class="text_input__split text_input__calendar">-->
<!--              <input type="text" name="docDate" id="docDate" class="text_input dateMask" value="30/01/2023"-->
<!--                     readonly="readonly">-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Expiry Date For First Payment</label><span-->
<!--            class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="text_input-group text_input-group&#45;&#45;calendar">-->
<!--            <span class="text_input__split text_input__calendar">-->
<!--              <input type="text" name="effectiveDate" id="effectiveDate" class="text_input dateMask required"-->
<!--                     value="06/03/2023" readonly="readonly">-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Dec Date</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          30/01/2023-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7">-->
<!--          <label>Post Entry Date</label>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--        </div>-->
<!--      </div>-->
<!--      <h3 class="margin_t_20">-->
<!--        <label>Exporter</label>-->
<!--      </h3>-->
<!--      <div class="c-table row">-->
<!--        <div class="c-table__th col-xl-3 col-7">-->
<!--          <label>Exporter Name</label>-->
<!--          <span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <input type="text" id="exporterNm" name="exporterNm" title="" class="text_input upperCase required"-->
<!--                 value="EDWIN" maxlength="100">-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Country of Exporter</label><span class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-9 col-24">-->
<!--            <div class="text_input-group">-->
<!--              <input type="text" id="exporterCountryCd" name="exporterCountryCd" size="null" maxlength="2"-->
<!--                     required="true" value="CN" class="text_input ui-autocomplete-input"-->
<!--                     onblur="setBlankName('exporterCountryCd', 'exporterCountryCdNm');getCodeName('Code', 'CO003', this.value, 'exporterCountryCd', 'exporterCountryCdNm', '', 'true', '');"-->
<!--                     uppercase="" autocomplete="off">-->
<!--              <span class="text_input__addon">-->
<!--                <button type="button" class="s-button search" data-button="windowOp" onclick="">-->
<!--                  <span class="skip">Search</span>-->
<!--                </button>-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5"><input type="text" id="exporterCountryCdNm" name="exporterCountryCdNm"-->
<!--                                                       size="null" value="China" class="text_input readonly" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Exporter Address</label><span class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-21 col-17">-->
<!--          <textarea id="exporterAddr" name="exporterAddr" style="width:100%;" class="text_input ht_3 upperCase required"-->
<!--                    uppercase="" onblur="javascript:limitMaxLength(this, 250);" rows="3">BEIJIN</textarea>-->
<!--        </div>-->
<!--      </div>-->
<!--      <h3 class="margin_t_20">-->
<!--        <label>Importer</label>-->
<!--      </h3>-->
<!--      <div class="c-table row">-->
<!--        <div id="importerTitle" class="c-table__th col-xl-3 col-7">-->
<!--          <label>Importer Code</label>-->
<!--          <span class="required">*</span>-->
<!--        </div>-->
<!--        <div id="importerContents" class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-7 col-24">-->
<!--            <input type="text" id="importerTin" name="importerTin" size="null" maxlength="20" required="true"-->
<!--                   value="C0002552124" class="text_input ui-autocomplete-input"-->
<!--                   onblur="setBlankName('importerTin', 'importerNm');getCodeName('CompanyCode', '', this.value, 'importerTin', 'importerNm', '', 'true', '');"-->
<!--                   uppercase="" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5"><input type="text" id="importerNm" name="importerNm" size="null"-->
<!--                                                       value="NIIMEL LOGISTICS LIMITED" class="text_input readonly" readonly="readonly">-->
<!--          </div>-->

<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Country of Importer</label><span class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <div class="col-xl-9 col-24">-->
<!--            <div class="text_input-group">-->
<!--              <input type="text" id="importerCountryCd" name="importerCountryCd" size="null" maxlength="2"-->
<!--                     required="true" value="GH" class="text_input ui-autocomplete-input"-->
<!--                     onblur="setBlankName('importerCountryCd', 'importerCountryCdNm');getCodeName('Code', 'CO003', this.value, 'importerCountryCd', 'importerCountryCdNm', '', 'true', '');"-->
<!--                     uppercase="" autocomplete="off">-->
<!--              <span class="text_input__addon"> <button type="button" class="s-button search" data-button="windowOp"-->
<!--                                                       onclick="javascript:goPopup('Code', 'importerCountryCd','importerCountryCdNm', '', '', 'CO003', '', '', '', '', '') "><span-->
<!--                  class="skip">Search</span></button></span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5"><input type="text" id="importerCountryCdNm" name="importerCountryCdNm"-->
<!--                                                       size="null" value="Ghana" class="text_input readonly" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="c-table__th col-xl-3 col-7"><label>Importer Address</label><span class="required">*</span></div>-->
<!--        <div class="c-table__td col-xl-21 col-17">-->
<!--          <textarea id="importerAddr" name="importerAddr" class="text_input ht_3 upperCase required" uppercase=""-->
<!--                    onblur="javascript:limitMaxLength(this, 250);" rows="3">P.O. BOX TN 1130</textarea>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row margin_t_20 margin_l_0">-->
<!--        <div class="col-xl-8 col-24">-->
<!--          <h3>-->
<!--            <label>Consignee</label>-->
<!--          </h3>-->
<!--        </div>-->
<!--        <div class="col-xl-16 col-24">-->
<!--          <div class="text_right"><input type="checkbox" id="samInfo">-->
<!--            Same as Importer-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="c-table row">-->
<!--        <div id="consigneeTitle" class="c-table__th col-xl-3 col-7">-->
<!--          <label>Consignee Code</label>-->
<!--          <span class="required">*</span>-->
<!--        </div>-->
<!--        <div id="consigneeContents" class="c-table__td col-xl-21 col-17">-->
<!--          <div class="col-xl-6 col-24">-->
<!--            <input type="text" id="consigneeActualTin" name="consigneeActualTin" size="null" maxlength="20"-->
<!--                   required="true" value="C0002552124" class="text_input target ui-autocomplete-input"-->
<!--                   onblur="setBlankName('consigneeActualTin', 'consigneeActualNm');getCodeName('CompanyCode', '', this.value, 'consigneeActualTin', 'consigneeActualNm', '', 'true', '');"-->
<!--                   uppercase="" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="col-xl col-24 margin_l_5"><input type="text" id="consigneeActualNm" name="consigneeActualNm"-->
<!--                                                       size="null" value="NIIMEL LOGISTICS LIMITED" class="text_input readonly" readonly="readonly">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7">-->
<!--          <label>Consignee Address</label>-->
<!--          <span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-21 col-17">-->
<!--          <textarea id="consigneeActualAddr" name="consigneeActualAddr" class="text_input ht_3 upperCase required"-->
<!--                    uppercase="" onblur="javascript:limitMaxLength(this, 250);" rows="3">P.O. BOX TN 1130</textarea>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row margin_t_20 margin_l_0">-->
<!--        <div class="col-xl-8 col-24">-->
<!--          <h3><label>Declarant Code</label></h3>-->
<!--        </div>-->
<!--        <div class="col-xl-16 col-24" id="restoreDeclarantDiv" style="display: none;">-->
<!--          <div class="text_right">-->
<!--            <input type="radio" name="changeDeclarant" id="sameImporter" value="01">-->
<!--            Same as Importer-->
<!--            <input type="radio" name="changeDeclarant" id="originalDeclarant" value="02" checked="checked">-->
<!--            Original Declarant-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="c-table row">-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Declarant TIN</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17" id="searchDeclarantTin">-->
<!--          C0002552124-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Declarant Code</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17" id="declarantCdText">-->

<!--          TNNMEL02-->
<!--        </div>-->
<!--        <input type="hidden" id="declarantCd" name="declarantCd" value="TNNMEL02">-->
<!--        <input type="hidden" id="submitDeclarantCd" name="submitDeclarantCd" value="">-->
<!--        <div class="c-table__th col-xl-3 col-7">-->
<!--          <label>Declarant Name</label>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17" id="searchdeclarantNm">-->
<!--          NIIMEL LOGISTICS LIMITED-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7">-->
<!--          <label>Declarant Address</label>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17" id="searchDeclarantAddr">-->
<!--          P.O. BOX TN 1130-->
<!--        </div>-->
<!--      </div>-->
<!--      <h3 class="margin_t_20">-->
<!--        <label>Taxpayer</label>-->
<!--      </h3>-->
<!--      <div class="c-table row">-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Taxpayer Code</label></div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <input type="text" name="taxpayerTin" id="taxpayerTin" class="text_input" value="C0002552124"-->
<!--                 readonly="readonly">-->
<!--        </div>-->
<!--        <div class="c-table__th col-xl-3 col-7"><label>Taxpayer</label><span class="required">*</span>-->
<!--        </div>-->
<!--        <div class="c-table__td col-xl-9 col-17">-->
<!--          <span class="checkbox-item">-->
<!--            <input type="radio" class="" name="taxpayerCd" id="taxpayerCd0" value="IM" onchange="taxpayerFn.init();"-->
<!--                   required="true">-->
<!--            <label for="taxpayerCd0">Importer</label>-->
<!--          </span>-->
<!--          <span class="checkbox-item">-->
<!--            <input type="radio" class="" name="taxpayerCd" id="taxpayerCd1" value="CA" onchange="taxpayerFn.init();"-->
<!--                   required="true">-->
<!--            <label for="taxpayerCd1">Consignee/Actual Exporter</label>-->
<!--          </span>-->
<!--          <span class="checkbox-item">-->
<!--            <input type="radio" class="" name="taxpayerCd" id="taxpayerCd2" value="DE" checked="checked"-->
<!--                   onchange="taxpayerFn.init();" required="true">-->
<!--            <label for="taxpayerCd2">Declarant</label>-->
<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="g-button-group margin_t_10 right">-->
<!--        <button type="button" class="g-button default back" style="margin-right: 5px;">-->
<!--          <label>Back</label>-->
<!--        </button>-->
<!--        <button type="button" class="g-button register save" style="margin-right: 5px;">-->
<!--          <label>Save as Draft</label>-->
<!--        </button>-->
<!--        <button type="button" class="g-button default next" style="margin-right: 5px;">-->
<!--          <label>Next</label>-->
<!--        </button>-->
<!--      </div>-->
<!--    </form>-->
<!--  </article>-->
</template>

<script>

export default {
  name: 'HomeView',
  props: ['rates', 'tracking'],
  data () {
    return {
      columns: ["Country", "Selling", "Buying"]
    }
  },
  methods: {
    itemValue(item, column) {
      // console.log("Here is the item hasValue: " + item[column.toLowerCase()])
      return item[column.toLowerCase()];
    },
  }
}
</script>
