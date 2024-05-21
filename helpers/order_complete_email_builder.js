exports.buildEmail = (userName, orderItems, totalPrice) => {
  const orderTemplates = [];
  for (const orderItem of orderItems) {
    const { productImage, productName, productPrice, productAuthorName, productSaleOff, productSource } = orderItem;
    const priceAfterSaleOff = productPrice - productPrice * productSaleOff / 100;
    orderTemplates.push(
      orderItemTemplate(
        productImage,
        productName,
        productAuthorName,
        priceAfterSaleOff,
        productSource
      )
    );
  }
  const orderRows = orderTemplates.join(' ');

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    dir="ltr"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="vi"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>New Message</title>
      <!--[if (mso 16)
        ]><style type="text/css">
          a {
            text-decoration: none;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9
        ]><xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <style type="text/css">
        #mttContainer {
          left: 0 !important;
          top: 0 !important;
          width: 1000px !important;
          margin-left: -500px !important;
          position: fixed !important;
          z-index: 100000200 !important;
          background: none !important;
          pointer-events: none !important;
          display: inline-block !important;
          visibility: visible !important;
          white-space: pre-line;
        }
        .tippy-box[data-theme~="custom"],
        .tippy-content * {
          font-size: 14px !important;
          text-align: center !important;
          overflow-wrap: break-word !important;
          color: #ffffffff !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif !important;
          white-space: pre-line;
        }
        .tippy-box[data-theme~="custom"] {
          max-width: 600px !important;
          backdrop-filter: blur(4px) !important;
          background-color: #000000b8 !important;
          border: 1px solid #ffffff00;
        }
        [data-tippy-root] {
          display: inline-block !important;
          visibility: visible !important;
          position: absolute !important;
        }
        .tippy-box[data-theme~="custom"][data-placement^="top"]
          > .tippy-arrow::before {
          border-top-color: #000000b8 !important;
        }
        .tippy-box[data-theme~="custom"][data-placement^="bottom"]
          > .tippy-arrow::before {
          border-bottom-color: #000000b8 !important;
        }
        .tippy-box[data-theme~="custom"][data-placement^="left"]
          > .tippy-arrow::before {
          border-left-color: #000000b8 !important;
        }
        .tippy-box[data-theme~="custom"][data-placement^="right"]
          > .tippy-arrow::before {
          border-right-color: #000000b8 !important;
        }
        .mtt-highlight {
          background-color: #21dc6d40 !important;
          position: absolute !important;
          z-index: 100000100 !important;
          pointer-events: none !important;
          display: inline !important;
          border-radius: 3px !important;
        }
        .mtt-image {
          width: 580px !important;
          border-radius: 3px !important;
        }
        .ocr_text_div {
          position: absolute;
          opacity: 0.5;
          color: transparent !important;
          border: 2px solid CornflowerBlue;
          background: none !important;
          border-radius: 3px !important;
        }
        .rollover span {
          font-size: 0;
        }
        #outlook a {
          padding: 0;
        }
        .es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
        }
        [data-ogsb] .es-button.es-button-1716284327570 {
          padding: 10px 30px !important;
        }
        @media only screen and (max-width: 600px) {
          p,
          ul li,
          ol li,
          a {
            line-height: 150% !important;
          }
          h1,
          h2,
          h3,
          h1 a,
          h2 a,
          h3 a {
            line-height: 120%;
          }
          h1 {
            font-size: 36px !important;
            text-align: left;
          }
          h2 {
            font-size: 26px !important;
            text-align: left;
          }
          h3 {
            font-size: 20px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 36px !important;
            text-align: left;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 26px !important;
            text-align: left;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
            text-align: left;
          }
          .es-menu td a {
            font-size: 12px !important;
          }
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li,
          .es-header-body a {
            font-size: 14px !important;
          }
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li,
          .es-content-body a {
            font-size: 16px !important;
          }
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li,
          .es-footer-body a {
            font-size: 14px !important;
          }
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li,
          .es-infoblock a {
            font-size: 12px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3 {
            text-align: right !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-button-border {
            display: inline-block !important;
          }
          a.es-button,
          button.es-button {
            font-size: 20px !important;
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .es-adapt-td {
            display: block !important;
            width: 100% !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-m-p0 {
            padding: 0 !important;
          }
          .es-m-p0r {
            padding-right: 0 !important;
          }
          .es-m-p0l {
            padding-left: 0 !important;
          }
          .es-m-p0t {
            padding-top: 0 !important;
          }
          .es-m-p0b {
            padding-bottom: 0 !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          tr.es-desk-hidden,
          td.es-desk-hidden,
          table.es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          table.es-social {
            display: inline-block !important;
          }
          table.es-social td {
            display: inline-block !important;
          }
          .es-m-p5 {
            padding: 5px !important;
          }
          .es-m-p5t {
            padding-top: 5px !important;
          }
          .es-m-p5b {
            padding-bottom: 5px !important;
          }
          .es-m-p5r {
            padding-right: 5px !important;
          }
          .es-m-p5l {
            padding-left: 5px !important;
          }
          .es-m-p10 {
            padding: 10px !important;
          }
          .es-m-p10t {
            padding-top: 10px !important;
          }
          .es-m-p10b {
            padding-bottom: 10px !important;
          }
          .es-m-p10r {
            padding-right: 10px !important;
          }
          .es-m-p10l {
            padding-left: 10px !important;
          }
          .es-m-p15 {
            padding: 15px !important;
          }
          .es-m-p15t {
            padding-top: 15px !important;
          }
          .es-m-p15b {
            padding-bottom: 15px !important;
          }
          .es-m-p15r {
            padding-right: 15px !important;
          }
          .es-m-p15l {
            padding-left: 15px !important;
          }
          .es-m-p20 {
            padding: 20px !important;
          }
          .es-m-p20t {
            padding-top: 20px !important;
          }
          .es-m-p20r {
            padding-right: 20px !important;
          }
          .es-m-p20l {
            padding-left: 20px !important;
          }
          .es-m-p25 {
            padding: 25px !important;
          }
          .es-m-p25t {
            padding-top: 25px !important;
          }
          .es-m-p25b {
            padding-bottom: 25px !important;
          }
          .es-m-p25r {
            padding-right: 25px !important;
          }
          .es-m-p25l {
            padding-left: 25px !important;
          }
          .es-m-p30 {
            padding: 30px !important;
          }
          .es-m-p30t {
            padding-top: 30px !important;
          }
          .es-m-p30b {
            padding-bottom: 30px !important;
          }
          .es-m-p30r {
            padding-right: 30px !important;
          }
          .es-m-p30l {
            padding-left: 30px !important;
          }
          .es-m-p35 {
            padding: 35px !important;
          }
          .es-m-p35t {
            padding-top: 35px !important;
          }
          .es-m-p35b {
            padding-bottom: 35px !important;
          }
          .es-m-p35r {
            padding-right: 35px !important;
          }
          .es-m-p35l {
            padding-left: 35px !important;
          }
          .es-m-p40 {
            padding: 40px !important;
          }
          .es-m-p40t {
            padding-top: 40px !important;
          }
          .es-m-p40b {
            padding-bottom: 40px !important;
          }
          .es-m-p40r {
            padding-right: 40px !important;
          }
          .es-m-p40l {
            padding-left: 40px !important;
          }
          .es-desk-hidden {
            display: table-row !important;
            width: auto !important;
            overflow: visible !important;
            max-height: inherit !important;
          }
        }
        @media screen and (max-width: 384px) {
          .mail-message-content {
            width: 414px !important;
          }
        }
      </style>
    </head>
    <body
      style="
          width: 100%;
          font-family: arial, 'helvetica neue', helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
    >
      <div
        dir="ltr"
        class="es-wrapper-color"
        lang="vi"
        style="background-color: #fafafa"
      >
        <!--[if gte mso 9
          ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#fafafa"></v:fill> </v:background
        ><![endif]-->
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          role="none"
          style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
              background-color: #fafafa;
            "
        >
          <tr>
            <td valign="top" style="padding: 0; margin: 0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                role="none"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
              >
                <tr>
                  <td
                    class="es-info-area"
                    align="center"
                    style="padding: 0; margin: 0"
                  >
                    <table
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                      bgcolor="#FFFFFF"
                      role="none"
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                              padding: 0;
                              margin: 0;
                              padding-top: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                        >
                          <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr>
      <td style="width:268px" valign="top"><![endif]-->
                          <table
                            class="es-left"
                            cellspacing="0"
                            cellpadding="0"
                            align="left"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: left;
                              "
                          >
                            <tr>
                              <td
                                align="left"
                                style="padding: 0; margin: 0; width: 268px"
                              >
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  role="presentation"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      class="es-infoblock"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                    >
                                      <p
                                        style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                      >
                                        3Z Store
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="es-m-p0l es-m-txt-l"
                                      align="left"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                    >
                                      <img
                                        src="https://ehunemi.stripocdn.email/content/guids/CABINET_ae04aae15e3f038350b98c90135e1abd9055c0d0440e568965d3aedf284b12e1/images/splashlogo.png"
                                        alt
                                        width="108"
                                        style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                          "
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]></td><td style="width:20px"></td><td style="width:272px" valign="top"><![endif]-->
                          <table
                            class="es-right"
                            cellspacing="0"
                            cellpadding="0"
                            align="right"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: right;
                              "
                          >
                            <tr>
                              <td
                                align="left"
                                style="padding: 0; margin: 0; width: 272px"
                              >
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  role="none"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding: 0; margin: 0; display: none"
                                    ></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                role="none"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#ffffff"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                    >
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 10px;
                                          padding-bottom: 10px;
                                          font-size: 0px;
                                        "
                                    >
                                      <img
                                        src="https://ehunemi.stripocdn.email/content/guids/CABINET_83c79fe6710c9b2a88d2db353ad3b6f6/images/99411618298697800.png"
                                        alt
                                        style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                          "
                                        width="100"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-txt-c"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 10px;
                                        "
                                    >
                                      <h1
                                        style="
                                            margin: 0;
                                            line-height: 46px;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            font-size: 46px;
                                            font-style: normal;
                                            font-weight: bold;
                                            color: #333333;
                                          "
                                      >
                                        Đơn hàng của bạn
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-p0r es-m-p0l"
                                      style="
                                          margin: 0;
                                          padding-top: 5px;
                                          padding-bottom: 20px;
                                          padding-left: 40px;
                                          padding-right: 40px;
                                        "
                                    >
                                      <p
                                        style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 21px;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                      >
                                        Chào ${userName} Cảm ơn bạn đã mua hàng
                                        tại 3Z Book Store. Chúng tôi xin gửi bạn
                                        thông tin đơn hàng cùng link tải sách mà
                                        bạn đã chọn
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                role="none"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#ffffff"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                              margin: 0;
                              padding-bottom: 10px;
                              padding-top: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      class="es-m-txt-l"
                                      style="padding: 0; margin: 0"
                                    >
                                      <h2
                                        style="
                                            margin: 0;
                                            line-height: 31px;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            font-size: 26px;
                                            font-style: normal;
                                            font-weight: bold;
                                            color: #333333;
                                          "
                                      >
                                        Thông tin đơn hàng
                                      </h2>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${orderRows}
                      <tr>
                        <td
                          class="esdev-adapt-off"
                          align="left"
                          style="
                              padding: 0;
                              margin: 0;
                              padding-bottom: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                          >
                            <tr>
                              <td
                                class="es-m-p0r"
                                align="center"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      border-top: 2px solid #efefef;
                                    "
                                  role="presentation"
                                >
                                  <tr>
                                    <td
                                      align="right"
                                      class="es-m-txt-r"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 15px;
                                        "
                                    >
                                      <h3
                                        style="
                                            margin: 0;
                                            line-height: 24px;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            font-size: 20px;
                                            font-style: normal;
                                            font-weight: bold;
                                            color: #333333;
                                          "
                                      >
                                        Tổng tiền: 200000 VND
                                      </h3>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer"
                align="center"
                role="none"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 640px;
                        "
                      role="none"
                    >
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-infoblock"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                    >
                                      <p
                                        style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                      >
                                        <a
                                          target="_blank"
                                          href=""
                                          style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #cccccc;
                                              font-size: 12px;
                                            "
                                          >View online version</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                role="none"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
              >
                <tr>
                  <td
                    class="es-info-area"
                    align="center"
                    style="padding: 0; margin: 0"
                  >
                    <table
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                      bgcolor="#FFFFFF"
                      role="none"
                    >
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-infoblock"
                                      style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                    >
                                      <p
                                        style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                      >
                                        <a
                                          target="_blank"
                                          href=""
                                          style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #cccccc;
                                              font-size: 12px;
                                            "
                                        ></a
                                        >Vạn đầu sách hay đang chờ bạn tại 3Z Book
                                        Store
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
  `
};

function orderItemTemplate(
  itemImage,
  itemName,
  itemAuthorName,
  itemPrice,
  itemSrc,
) {
  return `<tr>
  <td
    class="esdev-adapt-off"
    align="left"
    style="
      margin: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      class="esdev-mso-table"
      role="none"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
        width: 560px;
      "
    >
      <tr>
        <td
          class="esdev-mso-td"
          valign="top"
          style="padding: 0; margin: 0"
        >
          <table
            cellpadding="0"
            cellspacing="0"
            class="es-left"
            align="left"
            role="none"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: left;
            "
          >
            <tr>
              <td
                class="es-m-p0r"
                align="center"
                style="padding: 0; margin: 0; width: 110px"
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 0;
                        margin: 0;
                        font-size: 0px;
                      "
                    >
                      <img
                        class="adapt-img"
                        src="${itemImage}"
                        alt
                        style="
                          display: block;
                          border: 0;
                          outline: none;
                          text-decoration: none;
                          -ms-interpolation-mode: bicubic;
                        "
                        width="110"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 0; margin: 0; width: 20px"></td>
        <td
          class="esdev-mso-td"
          valign="top"
          style="padding: 0; margin: 0"
        >
          <table
            cellpadding="0"
            cellspacing="0"
            class="es-left"
            align="left"
            role="none"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: left;
            "
          >
            <tr>
              <td
                align="center"
                style="padding: 0; margin: 0; width: 213px"
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr>
                    <td
                      align="left"
                      style="padding: 0; margin: 0"
                    >
                      <p
                        style="
                          margin: 0;
                          -webkit-text-size-adjust: none;
                          -ms-text-size-adjust: none;
                          mso-line-height-rule: exactly;
                          font-family: arial,
                            'helvetica neue', helvetica,
                            sans-serif;
                          line-height: 21px;
                          color: #333333;
                          font-size: 14px;
                        "
                      >
                        <b>
                          ${itemName}
                        </b
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      style="
                        padding: 0;
                        margin: 0;
                        padding-top: 5px;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          -webkit-text-size-adjust: none;
                          -ms-text-size-adjust: none;
                          mso-line-height-rule: exactly;
                          font-family: arial,
                            'helvetica neue', helvetica,
                            sans-serif;
                          line-height: 21px;
                          color: #333333;
                          font-size: 14px;
                        "
                      >
                        ${itemAuthorName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      style="padding: 0; margin: 0"
                    >
                      <span
                        class="es-button-border"
                        style="
                          border-style: solid;
                          border-color: #2cb543;
                          background: #5c68e2;
                          border-width: 0px;
                          display: inline-block;
                          border-radius: 4px;
                          width: auto;
                        "
                        ><a
                          href="${itemSrc}"
                          class="es-button es-button-1716284327570"
                          target="_blank"
                          style="
                            mso-style-priority: 100 !important;
                            text-decoration: none;
                            -webkit-text-size-adjust: none;
                            -ms-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            color: #ffffff;
                            font-size: 11px;
                            padding: 10px 30px;
                            display: inline-block;
                            background: #5c68e2;
                            border-radius: 4px;
                            font-family: arial,
                              'helvetica neue', helvetica,
                              sans-serif;
                            font-weight: normal;
                            font-style: normal;
                            line-height: 13px;
                            width: auto;
                            text-align: center;
                            mso-padding-alt: 0;
                            mso-border-alt: 10px solid
                              #5c68e2;
                          "
                          >Tải xuống</a
                        ></span
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 0; margin: 0; width: 20px"></td>
        <td
          class="esdev-mso-td"
          valign="top"
          style="padding: 0; margin: 0"
        >
          <table
            cellpadding="0"
            cellspacing="0"
            class="es-left"
            align="left"
            role="none"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: left;
            "
          >
            <tr>
              <td
                align="center"
                style="padding: 0; margin: 0; width: 109px"
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  role="none"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 0;
                        margin: 0;
                        display: none;
                      "
                    ></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 0; margin: 0; width: 20px"></td>
        <td
          class="esdev-mso-td"
          valign="top"
          style="padding: 0; margin: 0"
        >
          <table
            cellpadding="0"
            cellspacing="0"
            class="es-right"
            align="right"
            role="none"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: right;
            "
          >
            <tr>
              <td
                align="left"
                style="padding: 0; margin: 0; width: 68px"
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr>
                    <td
                      align="right"
                      style="padding: 0; margin: 0"
                    >
                      <p
                        style="
                          margin: 0;
                          -webkit-text-size-adjust: none;
                          -ms-text-size-adjust: none;
                          mso-line-height-rule: exactly;
                          font-family: arial,
                            'helvetica neue', helvetica,
                            sans-serif;
                          line-height: 21px;
                          color: #333333;
                          font-size: 14px;
                        "
                      >
                        <b>
                          ${itemPrice}VND
                        </b>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}
