import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raihaan Abubacar | Portfolio",
  description: "Portfolio profissional de Raihaan Abubacar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function loadEffects(){if(window.__portfolioEffectsQueued)return;window.__portfolioEffectsQueued=true;var script=document.createElement("script");script.src="/portfolio-effects.js?v=20260628";script.defer=true;document.body.appendChild(script)}function schedule(){var run=function(){setTimeout(loadEffects,300)};(window.requestIdleCallback||function(callback){setTimeout(callback,900)})(run)}if(document.readyState==="complete"){schedule()}else{window.addEventListener("load",schedule,{once:true})}})();`,
          }}
        />
      </body>
    </html>
  );
}
