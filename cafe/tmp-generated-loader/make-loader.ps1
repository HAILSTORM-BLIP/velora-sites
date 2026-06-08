Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

$frames = 150
$w = 1280
$h = 720
$out = "tmp-generated-loader"
$fontFamily = New-Object System.Drawing.FontFamily("Segoe UI")

function Lerp($a, $b, $t) { return $a + ($b - $a) * $t }
function Ease($t) { if ($t -lt 0) { return 0 } if ($t -gt 1) { return 1 } return $t * $t * (3 - 2 * $t) }

for ($i = 0; $i -lt $frames; $i++) {
  $t = $i / ($frames - 1)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0,0,$w,$h)),
    [System.Drawing.Color]::FromArgb(255, 10, 7, 5),
    [System.Drawing.Color]::FromArgb(255, 31, 18, 10),
    35
  )
  $g.FillRectangle($bg, 0, 0, $w, $h)
  $bg.Dispose()

  # Warm amber glow
  $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glowPath.AddEllipse(360, 105, 520, 430)
  $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
  $pgb.CenterColor = [System.Drawing.Color]::FromArgb(88, 216, 139, 49)
  $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 216, 139, 49))
  $g.FillPath($pgb, $glowPath)
  $pgb.Dispose(); $glowPath.Dispose()

  $pourStart = 0.18
  $pourEnd = 0.83
  $pourT = (Ease(($t - $pourStart) / ($pourEnd - $pourStart)))
  $tilt = -12 - (18 * $pourT)

  $figureState = $g.Save()
  $g.TranslateTransform(640, 360)
  $g.ScaleTransform(0.62, 0.62)
  $g.TranslateTransform(-640, -360)

  # Transform teapot group around center
  $state = $g.Save()
  $g.TranslateTransform(640, 250)
  $g.RotateTransform($tilt)
  $g.TranslateTransform(-640, -250)

  # Teapot body
  $potBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(480,145,255,185)),
    [System.Drawing.Color]::FromArgb(255, 95, 98, 98),
    [System.Drawing.Color]::FromArgb(255, 8, 9, 9),
    45
  )
  $g.FillEllipse($potBrush, 470, 142, 270, 190)
  $potBrush.Dispose()
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(125, 210, 214, 214), 2)), 470, 142, 270, 190)

  # Lid and knob
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 42, 43, 43))), 520, 112, 150, 52)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 28, 29, 29))), 585, 82, 42, 42)
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 220, 220, 220), 2)), 585, 82, 42, 42)

  # Handle
  $handlePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(230, 33, 34, 34), 18)
  $handlePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $handlePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $handle = New-Object System.Drawing.Drawing2D.GraphicsPath
  $handle.AddBezier(492, 185, 400, 140, 402, 292, 492, 270)
  $g.DrawPath($handlePen, $handle)
  $g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 225, 225, 225), 3)), $handle)
  $handle.Dispose(); $handlePen.Dispose()

  # Spout, clearly connected to body and mouth at tip
  $spout = New-Object System.Drawing.Drawing2D.GraphicsPath
  $spout.AddBezier(718, 210, 792, 160, 830, 162, 858, 195)
  $spout.AddBezier(858, 195, 820, 202, 785, 235, 728, 247)
  $spout.CloseFigure()
  $spoutBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(710,160,170,110)), [System.Drawing.Color]::FromArgb(255, 60, 62, 62), [System.Drawing.Color]::FromArgb(255, 10, 10, 10), 25)
  $g.FillPath($spoutBrush, $spout)
  $g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 230, 230, 230), 2)), $spout)
  $spoutBrush.Dispose(); $spout.Dispose()

  # Small highlighted mouth/opening at spout tip
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 18, 18, 18))), 850, 186, 22, 15)
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 230, 230, 230), 1)), 850, 186, 22, 15)

  $g.Restore($state)

  $cupState = $g.Save()
  $g.TranslateTransform(630, 500)
  $g.ScaleTransform(0.9, 0.9)
  $g.TranslateTransform(-630, -500)

  # Cup saucer shadow
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(95, 0, 0, 0))), 480, 552, 340, 46)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 230, 224, 216))), 485, 520, 330, 58)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 246, 242, 235))), 525, 516, 250, 42)

  # Cup body path
  $cup = New-Object System.Drawing.Drawing2D.GraphicsPath
  $cup.AddBezier(500, 420, 520, 570, 740, 570, 760, 420)
  $cup.AddLine(760, 420, 500, 420)
  $cup.CloseFigure()
  $cupBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(500,420,260,160)), [System.Drawing.Color]::White, [System.Drawing.Color]::FromArgb(255, 206, 198, 187), 90)
  $g.FillPath($cupBrush, $cup)
  $g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(210, 255,255,255), 3)), $cup)
  $cupBrush.Dispose(); $cup.Dispose()

  # Cup rim
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 252, 249, 242))), 500, 394, 260, 56)
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(170, 196, 187, 176), 2)), 500, 394, 260, 56)

  # Coffee fill surface rises
  if ($pourT -gt 0) {
    $coffeeAlpha = [int](Lerp 0 255 $pourT)
    $coffeeY = [int](Lerp 441 404 $pourT)
    $coffeeH = [int](Lerp 8 42 $pourT)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($coffeeAlpha, 92, 45, 18))), 512, $coffeeY, 236, $coffeeH)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb([int]($coffeeAlpha * 0.35), 235, 174, 87))), 552, ($coffeeY + 7), 80, 13)
  }

  # Cup handle
  $cupHandlePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 235, 230, 222), 17)
  $cupHandlePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $cupHandlePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $cupHandle = New-Object System.Drawing.Drawing2D.GraphicsPath
  $cupHandle.AddBezier(747, 445, 838, 438, 823, 548, 754, 528)
  $g.DrawPath($cupHandlePen, $cupHandle)
  $g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 166, 154, 143), 2)), $cupHandle)
  $cupHandle.Dispose(); $cupHandlePen.Dispose()
  $g.Restore($cupState)

  # Coffee stream from the spout mouth to cup center. This is the main point.
  if ($pourT -gt 0.03) {
    $streamAlpha = [int](Lerp 0 245 (Ease(($pourT - 0.03) / 0.25)))
    $streamPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($streamAlpha, 90, 43, 17), 8)
    $streamPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $streamPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $stream = New-Object System.Drawing.Drawing2D.GraphicsPath
    # Coordinates visually connect from teapot spout mouth to cup center after tilt.
    $stream.AddBezier(842, 146, 822, 240, 716, 342, 632, 430)
    $g.DrawPath($streamPen, $stream)
    $highlightPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb([int]($streamAlpha * 0.32), 230, 161, 73), 2)
    $g.DrawPath($highlightPen, $stream)
    $stream.Dispose(); $streamPen.Dispose(); $highlightPen.Dispose()
  }

  # Minimal steam, after pour starts
  if ($pourT -gt 0.45) {
    for ($s = 0; $s -lt 3; $s++) {
      $phase = ($t * 2.4 + $s * 0.33) % 1
      $alpha = [int](90 * (1 - $phase))
      $steamPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 240, 226, 205), 2)
      $steamPath = New-Object System.Drawing.Drawing2D.GraphicsPath
      $x0 = 608 + $s * 22
      $steamPath.AddBezier($x0, 430 - 38 * $phase, $x0 - 15, 395 - 42 * $phase, $x0 + 15, 378 - 46 * $phase, $x0, 358 - 54 * $phase)
      $g.DrawPath($steamPen, $steamPath)
      $steamPen.Dispose(); $steamPath.Dispose()
    }
  }

  $g.Restore($figureState)

  # End fade flash, small amber particles
  if ($t -gt 0.82) {
    $burstT = Ease(($t - 0.82) / 0.18)
    for ($p = 0; $p -lt 18; $p++) {
      $ang = ($p / 18.0) * [Math]::PI * 2
      $dist = 30 + 220 * $burstT
      $px = 640 + [Math]::Cos($ang) * $dist
      $py = 440 + [Math]::Sin($ang) * $dist * 0.6
      $pa = [int](180 * (1 - $burstT))
      $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($pa, 219, 151, 70))), [float]$px, [float]$py, 6, 6)
    }
    $fadeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb([int](210 * $burstT), 13, 10, 8))
    $g.FillRectangle($fadeBrush, 0, 0, $w, $h)
    $fadeBrush.Dispose()
  }

  $path = Join-Path $out ("frame_{0:D4}.png" -f $i)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}
