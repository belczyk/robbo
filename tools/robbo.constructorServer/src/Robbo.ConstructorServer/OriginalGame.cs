﻿using System.Collections.Generic;


namespace Robbo.Local.API
{
    public static class OriginalGame
    {
        public static Universe OriginalUniverse = new Universe
        {
            games = new List<Game>
            {
                new Game
                {
                    name = "Original game",
                    startingNumberOfLives = 9,
                    planets = new List<Planet>
                    {
                        new Planet
                        {
                            boltsToBeCollected = 5,
                            name = "Planet 1",
                            map = @"w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  
w  X  _  _  _  L<s_  _  _  _  _  _  #  _  _  _  X  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  #  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  Lvs_  _  _  _  w  a  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  L>s_  +  a  _  _  _  _  _  _  _  _  w  _  _  X  _  _  X  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  s  R  T11_  #  T12X  _  T13#  _  _  _  _  _  _  _  _  
w  _  L^s_  _  _  _  _  0  _  Ee _  _  w  b  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  X  _  #  _  X  _  _  #  _  _  &  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  T21_  _  T22_  _  T23_  _  _  _  _  _  _  _  _  
w  _  _  _  _  @< w  @v _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  w  _  _  _  _  _  _  w  _  _  _  _  _  _  ?  ?  a  _  ?  ?  _  _  _  _  _  _  
w  _  _  _  _  _  w  _  _  _  _  _  _  w  _  _  _  _  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  _  _  _  _  _  w  +  _  _  _  _  _  w  _  _  _  b  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  _  _  _  _  _  w  +  _  _  _  _  _  w  _  _  _  _  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  _  _  _  _  _  w  a  _  _  _  _  _  w  _  _  _  _  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  @> _  _  _  _  w  _| _  _  _  _  @^ w  _  _  _  _  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  ?  ?  _  _  ?  ?  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  _  a  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  #o _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  X  _  _  _  _  w  k  _  _  _  _  0  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  0  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  a  _  _  _  _  _  _  _  w  _  0  0  0  0  0  0  0  w  w  w  w  w  w  w  w  w  w  
w  _  +  _  _  a  _  _  _  _  _  _  _  w  _  _  _  _  _  _  0  k  w  _  _  _  _  _  _  _  _  w  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  0  _  _  d  a  a  a  a  a  a  a  a  w  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  w  
w  B-v_  _  _  _  _  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  w  w  w  w  w  w  w  w  w  w  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  #  _  _  _  w  a  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  #  #  #  #  #  #  #  #  #  #  #  #  w  a  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  #  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  #  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  B-^_  _  #  B|>_  _  #  _  _  B|<w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _ 	_  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  w  #  _  _  0  +  +  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  w  _  _  _  _  +  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  Ea _  _  _  +  _  Ec _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  B- _  _  _  _  #  B| _  _  _  _  d  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  B- _  _  _  #  _  B| _  _  _  w  k  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  B- _  _  #  _  _  B| _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  L r_  B- _  #  _  0  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  B- #  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  #  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  #  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  l-v_  #  #  #  #  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  #  #  #  #  #  #  #  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  #  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  l|>_  _  _  l|<#  l-^_  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  M< _  _  _  _  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  #  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  Lv _  _  _  M> w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  L> _  _  _  _  _  _  _  L< _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  L^ _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  w  X  _  _  _  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  #  _  X  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  X  k  X  _  _  _  _  _  a  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  #  X  a  X  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  Lv X  #  Ea X  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  #  _| #  B- _  X  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _-v_  _  _  _  _  _  _  _  _  _  _  #  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  "

                        },
                        new Planet
                        {
                            name = "Planet 2",
                            boltsToBeCollected = 1,
                            map = @"w  w  w  w  w  w  w  w  w  w  w  w  w  w  
w  X  _  _  _  L<s_  _  _  _  _  _  #  _  
w  _  _  _  _  _  _  _  #  _  _  _  _  w  
w  _  _  _  _  _  _  _  Lvs_  _  _  _  w  
w  L>s_  +  a  _  _  _  _  _  _  _  _  w  
w  _  _  _  _  _  _  _  _  _  _  _  _  w  
w  _  L^s_  _  _  _  _  0  _  Ee _  _  w  
w  w  w  w  w  w  w  w  w  w  w  w  #  w  
w  _  _  _  _  _  _  _  _  _  _  R  _  _  
w  w  w  w  w  w  w  w  w  w  w  w  #  w  
w  _  _  _  _  @< w  @v _  _  _  _  _  _  
w  _  _  _  _  _  w  _  _  _  _  _  _  w  
w  _  _  _  _  _  w  _  _  _  _  _  _  w  
w  _  _  _  _  _  w  +  _  _  _  _  _  w  
w  _  _  _  _  _  w  +  _  _  _  _  _  w  
w  _  _  _  _  _  w  a  _  _  _  _  _  w  
w  @> _  _  _  _  w  B| _  _  _  _  _  w  
w  w  w  w  w  w  w  w  w  w  w  w  w  w  "

                        }
                    }
                }
            }
        };
    }
}
