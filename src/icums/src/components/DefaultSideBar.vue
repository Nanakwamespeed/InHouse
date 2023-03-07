<template>
  <aside class="side">
    <!-- login area  -->
    <div class="side-log">



      <!-- before login -->
      <ul class="login_area">
        <li><button type="button" class="btn_login" data-button="modal" data-target="#login-modal"
                    data-width="460" @click="$emit('open')">LOGIN</button></li>
        <li class="pw"><a href="javascript:popupOpen();" class="login_pw">Forgot Password?</a></li>
        <li><a href="javascript:popupRequestOpen();" class="login_account">Request Account</a></li>
        <li><a href="javascript:popupHowtoOpen();" class="login_account">How-to</a></li>
      </ul>
      <!-- before login -->


      <div class="test-server">{{ environment }}</div>
    </div>
    <!-- login area -->

    <div class="side-tab">
      <button id="web_side_menu_btn" type="button" class="side-tab__item active" data-button="sidetab"
              data-target=".side__taskmenu" title="TASK MENU" onclick="selectMenuTab(1, 'N');">Task Menu</button>
      <button id="web_side_mymenu_btn" class="side-tab__item " data-button="sidetab" data-target=".side__my"
              title="MY MENU" onclick="selectMenuTab(2, 'N');">My Menu</button>
    </div>

    <div id="web_side_menu" class="side-menu side__taskmenu active">
      <ul class="side-menu__list">
        <!-- guide link area -->
        <div class="side-link">

          <div class="video">
            <h2 class="title">Smuggling</h2>
            <ul>
              <li><a href="#"
                     class="smuggling">Smuggling Report</a></li>
            </ul>
          </div>
          <div class="video">
            <h2 class="title">Videos</h2>
            <ul>
              <li><a href="#" class="training">Training Videos</a>
              </li>
            </ul>
          </div>
          <div class="info">
            <h2 class="title">Info</h2>
            <ul>
              <li><a href="javascript:popupLawInformation();" class="lawinfo">Law Information</a></li>
              <li><a href="javascript:popupCertOfOriginInformation('AfCFTA Information', 2 );"
                     class="cfafta">AfCFTA Information</a></li>
              <li><a href="javascript:popupCertOfOriginInformation('Economic Partnership Agreement', 4 );"
                     class="epainfo">EU-EPA Information</a></li>
              <li><a href="javascript:popupCertOfOriginInformation('Ghana-UK Trade Partnership Agreement', 3 );"
                     class="tpainfo">UK-TPA Information</a></li>
            </ul>
          </div>
        </div>
        <!-- guide link area -->

        <div id="lnb">
          <h1>Guide Navigation</h1>
          <ul>
            <li class="noDepth"><a href="javascript:portalPdfViewr('CO230047067');">AEO</a></li>
            <li><a href="javascript:void 0;">Cargo</a>
              <ul>
                <li><a href="javascript:void 0;">Tracking</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036798');">Cargo Tracking</a>
                    </li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">Sea Import</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036799');">Manifest</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036800');">Discharge</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036801');">Delivery Order</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036802');">Service Request</a>
                    </li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">Air Import</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036803');">Manifest</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036804');">Discharge</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036805');">Delivery Order</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036806');">Service Request</a>
                    </li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">Road Manifest</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036807');">Manifest</a></li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">Transportation</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036808');">Bonded
                      Transportation</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036809');">Simple
                      Transportation</a></li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">Customs Area</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036810');">Carry-In/Out</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036811');">Dummy BL</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036812');">Merge BL</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036814');">Delivery Order</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036815');">Service Request</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Clearance</a>
              <ul>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036816');">BOE Create
                  &amp; Submit</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036817');">Simple
                  Amendment Create &amp; Submit</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036818');">Post Entry
                  Create &amp; Submit</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210038564');">Manifest
                  Info Transfer for PMD BOE</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036820');">BOE
                  Cancellation Request</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036821');">Assessment
                  Accept or Object</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036822');">Release
                  Prior to BOE Create &amp; Submit</a></li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Investigation</a>
              <ul>
                <li><a href="javascript:void 0;">Investigation</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210040288');">Process status of
                      the case cooperation</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Dispute</a>
              <ul>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037046');">Dispute</a>
                </li>
                <li class="noDepth"><a
                    href="javascript:portalPdfViewr('CO210037047');">Application</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037048');">Case
                  Review</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037049');">Prior
                  Dispute</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037050');">Case
                  File</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037051');">Prior Case
                  File</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210037052');">Case File
                  For Court</a></li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Post Clearance Audit</a>
              <ul>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210038496');">Target &amp;
                  Query Request</a></li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Passenger Clearance</a>
              <ul>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036991');">Sailing
                  Information</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036992');">APIS</a>
                </li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO220041290');">PNR</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036994');">Airline
                  Baggage</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036995');">High-risk
                  Passenger</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036996');">Suspected
                  terrorists</a></li>
                <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036997');">Others</a>
                </li>
              </ul>
            </li>
            <li><a href="javascript:void 0;">Single Window</a>
              <ul>
                <li><a href="javascript:void 0;">Applicant</a>
                  <ul>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037482');">Registration</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037483');">Application</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036825');">Letter of
                      commitment</a></li>
                  </ul>
                </li>
                <li><a href="javascript:void 0;">MDA</a>
                  <ul>
                    <li class="noDepth"><a href="javascript:portalPdfViewr('CO210036826');">Fee
                      Payment</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037484');">Registration</a>
                    </li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037486');">Application
                      Assignment</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037487');">Search
                      Application</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036830');">Letter of
                      commitment</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210036831');">Config</a></li>
                    <li class="noDepth"><a
                        href="javascript:portalPdfViewr('CO210037516');">Remittance
                      Management</a></li>
                  </ul>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </ul>
    </div>

    <div id="web_side_mymenu" class="side__my">
      <h2 class="side-title"><span>My Menu</span></h2>

    </div>

    <!-- service center area -->
    <div class="side-service">
      <dl>
        <dt>service center</dt>
        <dd class="call">030-275-0140</dd>
        <dd class="call">059-692-1182</dd>
        <dd>info@icums.gov.gh</dd>
      </dl>
    </div>
    <!-- service center area -->
  </aside>
</template>
<style></style>
<script>

export default {
  components: {
  },
  data() {
    return {
      title: 'ICUMS',
      showModal: false
    }
  },
  props: [
    'environment',
  ],
}
</script>