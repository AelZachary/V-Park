$up = (Get-ItemProperty -Path 'HKCU:\Environment' -Name Path -ErrorAction SilentlyContinue).Path
if ($null -eq $up) {
    $up = ''
}
$new = 'C:\Program Files\nodejs;' + $up
Write-Host "New user PATH length: $($new.Length)"
setx PATH "$new"
Write-Host "Updated user PATH with Node.js prefix. Open a new terminal or restart your shell to use it."