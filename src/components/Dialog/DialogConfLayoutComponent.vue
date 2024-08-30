<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md modal-general" style="width: 800px; max-width: 90vw">
      <q-form @submit="onSubmit" dense>
        <q-card-section class="modal-tex">
          <p>{{ props.title }}</p>
          <div class="row q-pt-md q-col-gutter-md justify-center">
            <div class="col-xs-10 col-md-5 col-lg-5">
              <q-select
                placeholder="Identificador del Proyecto"
                dense
                rounded
                outlined
                v-model="FileForm.proyect"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-xs-10 col-md-5 col-lg-5">
              <q-file
                dense
                rounded
                outlined
                v-model="fileName"
                label="Archivo de carga"
                no-error-icon
                @input="onFileChange"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
            <div class="col-xs-10 col-md-5 col-lg-10">
              <span>
                Archivo de carga
                <a
                  href="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQAAAAIAGNpnlikm1Ws2wAAADsCAAALABQAX3JlbHMvLnJlbHMBABAAAAAAAAAAAAAAAAAAAAAAAK2SwWrDMAyG730K43ujtIMxRpNexqC3MroH8GwlMYktI6tb9vYzg7EFShlsR0n///EdtNvPYVKvyNlTbPSmqrXCaMn52Df6+fS4vtP7drV7wslIieTBp6xKJ+ZGDyLpHiDbAYPJFSWM5dIRByNl5B6SsaPpEbZ1fQv8k6HbBVMdXKP54DZand4T/o0NAcU4IwYsMa4TlzaLx1zghnuURjuyx7LOn4mqkDVcFtr+Xoi6zlt8IHsOGOWSF86C0aG7rmRSumZ0859Gy8S3zDzBG/H4QjR+ucDiB9rVB1BLAwQUAAAACABjaZ5YBCHWFboAAAAbAQAAEQAUAGRvY1Byb3BzL2NvcmUueG1sAQAQAAAAAAAAAAAAAAAAAAAAAABtjk1rhEAQRO/+Cpm7tm4gBFn1llMWAklgr0Pb0WGdD6Y7GX9+JrKYS45FvXrUedzsWn5TZONdr9q6USU59JNxc68+3p+rJzUOxRlDhz7Sa/SBohjiMu8cdxh6tYiEDoBxIau5zoTL5aePVkuOcYag8aZnglPTPIIl0ZMWDb/CKhxGdVdOeCjDV1x3wYRAK1lywtDWLfyxQtHyv4O9OciNzUGllOr0sHP5UQvXy8vbfr4yjkU7JAVD8QNQSwMEFAAAAAgAY2meWPeOlC+MAAAA1wAAABAAFABkb2NQcm9wcy9hcHAueG1sAQAQAAAAAAAAAAAAAAAAAAAAAACdzs0KwjAQBOB7nyLk3qZ6ECn9uRTPHqr3kmzagNkNyVrq2xsRfACPwzAf0w67f4gNYnKEnTxUtRSAmozDpZO36VKe5dAX7TVSgMgOksgDTJ1cmUOjVNIr+DlVucbcWIp+5hzjoshap2Ek/fSArI51fVKwM6ABU4YfKL9is/G/qCH9+Zfu0ytkT/XFG1BLAwQUAAAACABjaZ5YnuQm2wABAACvAQAADwAUAHhsL3dvcmtib29rLnhtbAEAEAAAAAAAAAAAAAAAAAAAAAAAjU9BTsMwELz3FdbeqUPVVqFK0gMI0RMXoGcTb5JVY29ku6S8iyfwMZxUqXLk5Jldz8xOtr+YVnyh88Q2h/tlAgJtyZpsncP72/NdCvtikfXsTp/MJxG/W79zOTQhdDspfdmgUX7JHdq4q9gZFSJ1teSqohKfuDwbtEGukmQrHbYqxCjfUOfh6vYfL985VNo3iMG0VyujyEKRDVd9EPa+uB05UHE5ktXc5xAbfU94HUk/4iPp0MTCm4ftbfaCVDchDtMkTUAWmZyZj9nTK6wymMMj24rqs1Ml/f5YEOPuoKMDCLejCNxBrwenueq1w0HBFv1MsppJNmP4lCinXsXiD1BLAwQUAAAACABjaZ5YNBWPPucAAAA2AwAAGgAUAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzAQAQAAAAAAAAAAAAAAAAAAAAAAC9ks1qwzAQhO95CrH3WLb7QymRcymFXNv0AYS8tkxsSay2SfP2VVPaxBBMD6YnMSPtzCek1fpj6MUeKXbeKSiyHAQ64+vOtQrets/LB1hXi9UL9prTkWi7EEWacVGBZQ6PUkZjcdAx8wFd2mk8DZqTpFYGbXa6RVnm+b2kywyoRpliUyugTV2A2B4D/iXbN01n8Mmb9wEdX6mQ0WrC+pUpXSamYE0tsoKRnaVUkNdhyllh+NjjJcVJT9XfzFnPaRbP7Sf5bRZTDLdzMhw87aJF5DPHr/X1WmmZhLn7Z5jyB0aOvn+1+ARQSwMEFAAAAAgAY2meWFRtWOXkBQAAzFQAABMAFAB4bC90aGVtZS90aGVtZTEueG1sAQAQAAAAAAAAAAAAAAAAAAAAAADtXNtu2zgQfe9XCHpdtLJuvgRxirSp0QXSrpFksc+0RNmqKUpL0mmSr1+SkijJknNpk7aLjgMkvBxxhsPDoXni5PjtTUasa8x4mtO57b4Z2RamUR6ndD23/75avJ7ab09eHaMjscEZtiSa8iM0tzdCFEeOwyPZjPibvMBU9iU5y5CQVbZ2Yoa+ylEy4nij0djJUErt6nn2mOfzJEkjfJZHuwxTUQ7CMEFCeso3acFti6IMz+13BNGtfVL7+IFg9QBXDRFhl5F2fB8ab131g7P16j1h1jUic3ukX7ZzcuwYABF93EK/KlwFiLdeD3c6UV9mPK8cr48LffVlxtMAFEVyEkM+nnrGdgtUFvtju+MPk/ddfGt8v4cfu2dTf9zB+w0+GIjF2cz3OvigwYcD+HEQfOjgwwY/HsAH3qnbwWvQhqR0O7iCJjoGkuTk4yB8sWjBG5TTIk75PBUHaJShLzlbyH69tpKb1BK3BU5QJGEfMbnGIo2Q9RnvsDKDjjB6ABDxewHOns0spT/egcam046OjlV2KFRJSsiluCX4nGtneU7SeCEbdUU/Yxam2MhiZa2DWzOkyxbLxT+p2FxuUCGtuNrCmldDr7lV5FzSwT44tk4XKRXVDqw3vkQj8SmPy2a/nRDMMLq25m1Dvhrgscb8yfcZc0vgI6254bC18F5rTiuaclNYSB0H7tgrTVs8QgTHKu7lAPWyvOASuaPWGm1QjAeaW/NzvZl8PXs0wyc58TxBHvWC7PR3E6HdmvV1bs9CL7StCBVzO5GpQRazQo7H6dq2EFnL8z4S5QQf3ot7M54Ns8odBYei3jFRMC7OEN+UT+mu+vijjf9eGKg4PM8EnG/1wp+6P9ELZ39pcZLgSBxoaaqyrxxksPf5wc6QZ6v14hdO+sE3bdrGUPCUxBGEQ4ljNvs+Fx6TvFrmvOEZe2H42DRVILGx1DdJ+pRFBJuj/Sq/kKtvmRxpibn9eloWmWlcSZ+nrcmpoX7UCTIdvfy52wq2fyDYo9HLBDsciHV4f6id/hZ1Wm/hdK13p8pXX6TtM/kGcUfKFl7IWllYsv4uP3h16sAOpPyHkkZ1BXpCYkVHLN/RuJ3o24lNzcKveuv5rPL4dskUHRXdLF5Ei1QOfo64WCKGFDXVHVr8Jb8lJJfzyKuSbW1ydjfUrvDyGix7besrU/Pl/+4Qw7ZF/qRcLd1UL2y7wtqVVbtCd9n7nGhHpHe6WJ1bTBBdlUVEI2mvPK6sXcHS9UaY/VOc7kS+SKvcXs5YrwtvDoAYJ0sZhwyxcz2gLFzoQkpjuQqlEX0iEtuS4Cu0uryTWc4NgsoVDVE3hlMNQ9KmnLC6tpzTd2yruzfyfVBK18sdjYx78gwsotLPaBn13hI6XcS7mo7RUvDqZlgzpN17moh7cFXvaifJdnXjlOXLO1NUNyBT+ZxT7FQxupAxWumprBDH8p0d1hVNaipxMl41j8qfgqVbrPoudUm2yKi5evl29SPbXZZm+ZfySap0EpLe4Y9NgNR3mivyt6l9eCt21I4OrLsddqq5muf+BfOPjL4mYuBiqTowGrhQqo6IV2nxNnvoqllGsy4uK0peE7d4YR66wMOah9NfjYddXlRsqIjhATGAGIYYXkMMH4gBxDDE8BtiBEAMIIYhRtAQIwRiADEMMcKGGGMgBhDDEGPcEGMCxABiGGJMGmJMgRhADEOMaUOMGRADiGGIMSvqckt05XWB0AucWGl8U0W1/FXAfltprIeUsTVtOgCVn+a3d0bEJ3RPzTdBAJF+X6SXO9Gf1SJ9EE7cWS3SVz2rds+TRHrRk+hpriT65KdL9JBS/i8pBSRz4AVI5kAMkMyBGCCZAzFAMgdigGQOxADJHIgBkjkQAyRzIAZI5t8smRulXNw8JJm73qQvmbdQWSows0iaVX9WMrJ/48+nC/h0Onw6HT6dDkcUSO1ADJDagRggtQMxgBggtQMxQGoHYoDUDsQAqR2IAVI7EON3kdorhd3p//uZ+l/UnLz6D1BLAwQUAAAACABjaZ5YPfE7OjwDAACiCgAAGAAUAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbAEAEAAAAAAAAAAAAAAAAAAAAAAAlZZLc5swFIX3+RUMi6xa8wY7xWTSQNpOH8m0absmRhhNAFFJ2O2/75VkYxvVLWVhpMO5V98BDyi+/tnUxgZRhkm7NJ2ZbRqoXZECt+ul+fXx7uXcvE4u4i2hz6xCiBvgb9kVXZoV592VZbFVhZqczUiHWrhWEtrkHKZ0bZGyxCuUklXfoJZbrm2HFkV1zmEtVuGOmarblF6soygvJEJTq1ZNjlsziQsM3QW+QVG5NG+cq8yxTSuJpfkbRlt2NDZEkidCnsXkXbE0ITCryPYNxcUH3CImlQKVeV9zId6SmkBaR3S0tJZ3EvGB7ivA/R0XvIKCcObBMfT6TLZvEV5XHC4tZgvTWPWMk2bQTIP0vAaCD2iDanBLkGMNegsNOFakZvLXaHAra5v8pzxv1eJBOHMiBxZh/FeN5BW13B5u10XVu7t6d6j37Yml3q7UG0pddxZMLPZ3xcFQLG5a4IQT68N97tCb+//Xw1K3UD7DNOd5ElOyNeRzNsTjcO2ZH+jPCBYXphtwwRz+v0zctSTeJHZsbUTbneO17nBOHbe6wz11pLrDO3VkjrzmyUQQYEjhqhSOPwv/ksI96u/L/v4ohe4IRimOHYF0hKMUuiMapXDltVBL4U1K4WmM81EK3bEYpfD+meLYEYGjTC5/9IS/Wi7VObbKP0XzzkTzh2jR+WS+LJ7L/7wMooTFINyOhXQsZEpQL8QTgmAKQaCqnQPCTnEPDJqSakoWnKMIp1CEGkWoUWhKqilZeI4imkIRaRSRRqEpqaZk0TmK+RSKuUYx1yg0JdWUbH6OYjGFYqFRLDQKTUk1JVucowBpAoZwiXrvwLGX/AOILqW6lO2l4MBiHX0eunyNPuZ0jVtm1KgEDFt856hCkmNOOjGKYPhEOADvZxXsXBAVMzeCA259SQg/USy1whfE+84oMWX8Aaaf+uYJqY9SifkjOdosyPnwRTPYKhffughepT1Dd+MGYidBMWzC5N5raXaEcppjbhpi1Xsq8QqybR8r1N7DdlAAKew7iZrEpCh2w8u86V7dyl/17nuL6g3ieJUbn1CPXnxG677OqbombY4rT+9tecjxQ2wdOsbW6VrWsN1MLn4DUEsDBBQAAAAIAGNpnlhXPnJzUgMAAEILAAAYABQAeGwvd29ya3NoZWV0cy9zaGVldDIueG1sAQAQAAAAAAAAAAAAAAAAAAAAAACdlkuTk0AUhff+ii4WrjS8AklGgqUDqOVrSkddM6GTdAk0djeJ/nv7wRDITarQLBI4HE5/94aib/Tyd1WiA2ac0HptuTPHQrje0ILUu7X17T57vrRexk+iI2U/+R5jgaS/5jdsbe2FaG5sm2/2uMr5jDa4lte2lFW5kKdsZ9PtlmxwQjdthWthe44T2gyXuZBr8T1puGXSpmTxhuG80AhVaaKqnNRWHGntjsVRk+/wVyy+NXcMbYm4p3dSkDVZdhzZvasgEkZVixjerq1X7k3mOsqiHd8JPvLBMVKFP1D6U528K9aW7A/f0+MbRooPpMZcKwXe5m0plHhLS8pGiw4jM12R5OvukO4fpBB7eUM48+Wnz/pCj28x2e2FvOTPVhbatFzQqtcsRFtRSoIP+IBL6dYgQ01mK01ybGjJ9TeqSK3vrfLfa8uz0PG0eOCGsjTxp1QtCx/Xe6TrYkyA3wX4fYDv/lPAvAsI/5dg0QW4ob+c/2OIbdqh/48kF3kcMXpE+j9DqrVeOAsD2G+5ujK9ki55Lh9drjoYR4fYdSL7oHI7y+sLFndsub1g8caW5ILFH1vSC5b52JJdsAS9xZaV9+V7k8r3BnnuwgSGZ/WPPEvjWZw1YORZGc/yrANDj+cYz+qsBSOPqz1nONnIYnowv9wC37TAnc8W1zvgmyBfP5C63k6Z98ptpwS9kgAlBUrWKaF+Sodc8ylcc9NL98TVKd6JCygJUFKgZJ3iAK5gClcAuALABZQEKClQsuAaVziFKwRcIeACSgKUFChZeI1rMYVrAbgWgAsoCVBSoGSLa1zLKVxLwLUEXEBJgJICJVte41pN4VoBrhXgAkoClBQo2eoal5QmgCmXun/wpniUBq8KKCVQSqGUPUrBCc8ebGpqGvqYsx2pOSrx1swMrJ8eBG307wMVEt5sfnLAwjLZmcmXEtpSKvozu5+u2kbOVowLNVt9aqsHbDZOPW8NhhN93u+6iG9yvSE7krnlODtPUKMLI3JI1LPh2mooEywnwkJq2c9McxX0WN/vcf1ZjquKyPBmmjOOaFF0h0/zqnlxq7+f/mqpePEWlwcsyCZHn3CLn33Bu7bMmbmmba6nf947+qOP7yL7lBjZ47XsfhyOn/wFUEsDBBQAAAAIAGNpnlhW+kGtTgEAAL0CAAAUABQAeGwvc2hhcmVkU3RyaW5ncy54bWwBABAAAAAAAAAAAAAAAAAAAAAAAIWS0UrDMBSG732K0Ftx2SqISNtR2kx7sW7MVrwrsc3WQJPU5Gzo4+wZfADBvZgZIoNm4mX+/5w/J99JMH0THdoxbbiSoTcZjT3EZK0aLjehVxazq1tvGl0ExgDaSv66ZYnaSgg93xbaVmlCrwXo7zA2dcsENSPVM2mdtdKCgj3qDTa9ZrQxLWMgOuyPxzdYUC69KDA8CiBKqOgVWmr1zmpQAYYowEfn14XDvlMbhe6ZZJp2w4KvT2IQcBvRMNRQUGjN6pZOnSAleqop8B0dWnk5r5IVSbNiMbRmSZWlJC+yWZbE6WLlO73OxGE4VLK0Is9Lm2+DyH83TFwCRz5/yP55+XooL3rLruaHD3mWXykpOpWgOQUmDnvgtcsxV+JFsyPsn6soSux+tTNHvCrIKnbkJ1KVuX2pg4EkD3GVkkcyr+w+HEyXJwHb/xhdfANQSwMEFAAAAAgAY2meWPMjgBaHAwAAbCkAAA0AFAB4bC9zdHlsZXMueG1sAQAQAAAAAAAAAAAAAAAAAAAAAADtWltvmzAUfu+vQH5fzSVp04mk2iJl20s1aZ20VwMmQTI2Mk6X9NfPF2hIFlRoLg2oRAn28bl95xhyOMK/X6XEesI8TxgdA+faBhamIYsSOh+D34+zTyNwP7nyc7Em+NcCY2FJAZqPwUKI7DOEebjAKcqvWYapXIkZT5GQUz6HecYxinIllBLo2vYNTFFCwcSny3SWitwK2ZIKafWFZJnTj2gMpCNG2ZRFeAy+YYo5IgBOfFiIT/yY0Y2WITCEiZ8/W0+ISL22Yg8ZYdxKaIRXWOodKRpFKTY83zF5wiIJkfWAl1irN0p2VLnHUzV8XdUUkSTgyX86gkKFWjgiyr1qnQPU6pNKUELIS4IGwBAmfoaEwJzO5MQqxo/rTGaZMlqo0XyvcM85WjvusLlAzkgSKS/m021cd0pHUFDRUrAiGLCi6mAjZg81taJPMoQB45G8PMsguh4oaROf4FhIeZ7MF+osWKYMMCFYKgdRguaMIqIslBJVSUtf1GMgFvqi3Em12VZQMRYWGvFrTu1KI3bJV3r8Cr+JlGE9OzavHTZvF9vh2XBaeuy089h5z2w4B2bjiJve23UFvil6DRyB5zJwccGEb47SGX1rJN50/8Mz2nhruo/qTLduZj3GNrqk+/SR02YfE5v3ge1cl5vd41vJafMGT1V8tilGRqcuduzzFTtH8qQYyKe1EBPyS+n8E2+1N1bxbmuDlkOUZWT9sEwDzGe64bGhzpiRL2bygXCz9lWb3My/kGROU1wV+MmZwKHQnR1bOoFKFtXwUY/tUp0EB6y/HGWPeCXK59FVLH+qUAywCib3tpOg2nnsXJrHg7uNy54cSk/U0AWW2YBq4rSG4uxAcc4f/BKJV0Xitt5G74KkmpQ6KN57J8XcvjoHYMF48iyVKwihJGAOTrHTBh877fIu/2E3ktIAyU1vkNz2BsmoN0jueoPEsfsDxekPlI7UYd0u5wd10e9M6ViLYNB5BMOul+/OTTfKwkZYbnuEZXTJO6vJn0N/qg+3P9WH25/qw73c6gMWPdFK13er5/tCtdQbU2PwoHwnwFrFBeBgmRCRUDOD1Zar1BmtNt1WvSpQQPC2lc2bX1KgaFtPiymfB+ZFIzkYgzi29aEEdlfMsX+lTsa21Xf/ilqrs1PnQZ2Motet1PkWRKEd7JVBQ/XZt+LpT7voIH3oxO3EHpY5gZv3JidX/wBQSwMEFAAAAAgAY2meWEZ+pj2ZAQAAQAcAABMAFABbQ29udGVudF9UeXBlc10ueG1sAQAQAAAAAAAAAAAAAAAAAAAAAAC1lctuwjAQRfd8RZRtlRhYVFXFY1HaZYtU+gEmniSG+CHbQPj7jkOLKuQEEHSTKDM+986MnWQ0rUUVbcFYruQ4HqT9OAKZKcZlMY6/Fm/JUzyd9EaLvQYb4Vppx3HpnH4mxGYlCGpTpUFiJldGUIePpiCaZmtaABn2+48kU9KBdInzGvFkNIOcbioXvdYYPvgiHkcvh3XeahxTrSueUYdp4rMkyBmobAe4leykuuSnshTJZo0tubYP7Q4rDcWJAxe+tZUuWhAtw4SPh4ml0EHCx8NEwfMg4eNhwrUQrpXQLO+Yrc+GOaG2HRxmObSQ285jENhNlec8A6ayjUAkRX5m6I63DrqubH2Tg9UGKLMlgBNV2ty91Qe+QYYziObUuHcqUJcgMzdKWzz/BtL62tZ+D6qnE41CYByH41HtdETp6w1POgU/NQbsQu+6Ijtl1kul1jdbB4acCsrlGX9bUgPs0xncf3v3Iv5on6vD7Su4ewGN6Blnhx9kOFwHN/s3MhdseVOhJc1tcOeuj/pX1jH87zpI80Oc9L4BUEsBAj4AFAAAAAgAY2meWKSbVazbAAAAOwIAAAsAAAAAAAAAAAAAAAAAAAAAAF9yZWxzLy5yZWxzUEsBAj4AFAAAAAgAY2meWAQh1hW6AAAAGwEAABEAAAAAAAAAAAAAAAAAGAEAAGRvY1Byb3BzL2NvcmUueG1sUEsBAj4AFAAAAAgAY2meWPeOlC+MAAAA1wAAABAAAAAAAAAAAAAAAAAAFQIAAGRvY1Byb3BzL2FwcC54bWxQSwECPgAUAAAACABjaZ5YnuQm2wABAACvAQAADwAAAAAAAAAAAAAAAADjAgAAeGwvd29ya2Jvb2sueG1sUEsBAj4AFAAAAAgAY2meWDQVjz7nAAAANgMAABoAAAAAAAAAAAAAAAAAJAQAAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzUEsBAj4AFAAAAAgAY2meWFRtWOXkBQAAzFQAABMAAAAAAAAAAAAAAAAAVwUAAHhsL3RoZW1lL3RoZW1lMS54bWxQSwECPgAUAAAACABjaZ5YPfE7OjwDAACiCgAAGAAAAAAAAAAAAAAAAACACwAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAj4AFAAAAAgAY2meWFc+cnNSAwAAQgsAABgAAAAAAAAAAAAAAAAABg8AAHhsL3dvcmtzaGVldHMvc2hlZXQyLnhtbFBLAQI+ABQAAAAIAGNpnlhW+kGtTgEAAL0CAAAUAAAAAAAAAAAAAAAAAKISAAB4bC9zaGFyZWRTdHJpbmdzLnhtbFBLAQI+ABQAAAAIAGNpnljzI4AWhwMAAGwpAAANAAAAAAAAAAAAAAAAADYUAAB4bC9zdHlsZXMueG1sUEsBAj4AFAAAAAgAY2meWEZ+pj2ZAQAAQAcAABMAAAAAAAAAAAAAAAAA/BcAAFtDb250ZW50X1R5cGVzXS54bWxQSwUGAAAAAAsACwDGAgAA2hkAAAAA"
                  download="Archivo_Carga_Ejemplo.xlsx"
                >
                  <strong>Descargar Ejemplo de Carga</strong>
                </a>
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Cancelar"
            @click="closeDialog"
          />

          <q-btn
            color="secondary"
            no-caps
            unelevated
            size="lg"
            rounded
            label="Aceptar"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped src="./DialogComponent.scss"></style>
<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import * as XLSX from 'xlsx';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { useAuth } from 'src/composables/userAuth';

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});

const $q = useQuasar();
const visible = ref(true);
const options = ref([]);
const fileName = ref(null);
const { getProyectsAll } = sysadocAuth();
const { isAcces } = useAuth();

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const FileForm = ref({
  proyect: '',
  created_at: today.toUTCString(),
  created_by: `${isAcces.value.username} ${isAcces.value.apellidos}`,
  layout: '',
  layout_spetial: '',
});

const emits = defineEmits(['cancel', 'select']);

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

const onFileChange = async (e) => {
  fileName.value = await e.target.files[0];
  e.preventDefault();
  if (fileName.value?.name === 'Carga_Config_proyecto.xlsx') {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const CargaRegistrosConfig = XLSX.utils.sheet_to_json(worksheet);
      const sheetName2 = workbook.SheetNames[1];
      const worksheet2 = workbook.Sheets[sheetName2];
      const CargaRegistrosConfigOperacion =
        XLSX.utils.sheet_to_json(worksheet2);

      FileForm.value.layout = CargaRegistrosConfig;
      FileForm.value.layout_spetial = CargaRegistrosConfigOperacion;
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  } else {
    fileName.value = null;
    $q.notify({
      type: 'negative',
      message: 'Archivo incorrecto favor de verificar.',
    });
  }
};
watch(
  () => FileForm.value.proyect.label,
  (newLabel) => {
    FileForm.value.proyect.value = newLabel;
  }
);
const onSubmit = () => {
  const data = {
    proyect: FileForm.value.proyect.value,
    created_at: FileForm.value.created_at,
    created_by: FileForm.value.created_by,
    layout: FileForm.value.layout,
    layout_spetial: FileForm.value.layout_spetial,
  };
  emits('select', data);
  closeDialog();
};
onMounted(async () => {
  const response = await getProyectsAll();
  options.value = response.resultado?.map((item) => ({
    label: item.proyecto,
    value: item.proyecto,
  }));
});
</script>
